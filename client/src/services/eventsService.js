import { getSupabase } from '../lib/supabaseClient';
import { mapEventRow, toEventInsert } from './eventMappers';

async function uploadEventImage(file) {
  if (!file || !(file instanceof File) || file.size === 0) return null;
  
  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('L\'image est trop volumineux (max 5MB)');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Le fichier doit être une image');
  }

  const ext = (file.name && file.name.split('.').pop()) || 'jpg';
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const supabase = getSupabase();
  
  try {
    const { error } = await supabase.storage
      .from('event-images')
      .upload(path, file, { contentType: file.type || 'image/jpeg', upsert: false });

    if (error) {
      console.error('Upload error:', error);
      throw new Error(`Erreur d'upload: ${error.message}`);
    }

    const { data } = supabase.storage.from('event-images').getPublicUrl(path);
    return data.publicUrl;
  } catch (err) {
    console.error('Image upload failed:', err);
    throw new Error(`Impossible d'uploader l'image: ${err.message}`);
  }
}

const eventsService = {
  getEvents: async (params = {}) => {
    const supabase = getSupabase();
    let q = supabase.from('events').select('*').order('date', { ascending: true });

    if (params.category) {
      q = q.eq('category', params.category);
    }

    const { data, error } = await q;
    if (error) throw error;

    let list = (data || []).map(mapEventRow);

    if (params.startDate) {
      const start = new Date(params.startDate);
      start.setHours(0, 0, 0, 0);
      const end = params.endDate ? new Date(params.endDate) : new Date(params.startDate);
      end.setHours(23, 59, 59, 999);
      list = list.filter((ev) => {
        const d = new Date(ev.date);
        return d >= start && d <= end;
      });
    }

    return { data: list };
  },

  getEventById: async (id) => {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('events').select('*').eq('id', id).maybeSingle();
    if (error) throw error;
    if (!data) {
      const err = new Error('Événement non trouvé');
      err.code = 'NOT_FOUND';
      throw err;
    }

    const { error: rpcError } = await supabase.rpc('increment_event_views', {
      event_id: Number(id)
    });
    if (rpcError) console.warn('increment_event_views:', rpcError.message);

    const mapped = mapEventRow(data);
    if (mapped) mapped.views = (mapped.views || 0) + 1;
    return { data: mapped };
  },

  createEvent: async (formData) => {
    try {
      const payload =
        formData instanceof FormData
          ? {
              title: formData.get('title'),
              description: formData.get('description'),
              date: formData.get('date'),
              startTime: formData.get('startTime'),
              endTime: formData.get('endTime') || '',
              location: formData.get('location'),
              category: formData.get('category'),
              price: formData.get('price'),
              image: formData.get('image')
            }
          : formData;

      const imageUrl = await uploadEventImage(payload.image);
      const insert = toEventInsert(payload, imageUrl);

      const supabase = getSupabase();
      const { data, error } = await supabase.from('events').insert(insert).select().single();
      if (error) {
        console.error('Database insert error:', error);
        throw new Error(`Erreur base de données: ${error.message}`);
      }

      return {
        success: true,
        message: 'Événement créé avec succès',
        data: mapEventRow(data)
      };
    } catch (err) {
      console.error('createEvent error:', err);
      throw err;
    }
  },

  updateEvent: async (id, formData) => {
    try {
      const payload =
        formData instanceof FormData
          ? {
              title: formData.get('title'),
              description: formData.get('description'),
              date: formData.get('date'),
              startTime: formData.get('startTime'),
              endTime: formData.get('endTime') || '',
              location: formData.get('location'),
              category: formData.get('category'),
              price: formData.get('price'),
              image: formData.get('image')
            }
          : formData;

      const supabase = getSupabase();
      const { data: existing, error: fetchErr } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (fetchErr) throw fetchErr;
      if (!existing) {
        const err = new Error('Événement non trouvé');
        err.code = 'NOT_FOUND';
        throw err;
      }

      let imageUrl = existing.image_url;
      if (payload.image && payload.image.size > 0) {
        imageUrl = await uploadEventImage(payload.image);
      }

      const patch = {
        ...toEventInsert(payload, imageUrl),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('events')
        .update(patch)
        .eq('id', id)
        .select()
        .single();
      if (error) {
        console.error('Database update error:', error);
        throw new Error(`Erreur base de données: ${error.message}`);
      }

      return {
        success: true,
        message: 'Événement mis à jour avec succès',
        data: mapEventRow(data)
      };
    } catch (err) {
      console.error('updateEvent error:', err);
      throw err;
    }
  },

  deleteEvent: async (id) => {
    const supabase = getSupabase();
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
    return { success: true, message: 'Événement supprimé avec succès' };
  },

  getStats: async () => {
    const res = await eventsService.getEvents({});
    const rows = res.data || [];

    const totalEvents = rows.length;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const thisMonth = rows.filter((e) => {
      const d = new Date(e.date);
      return d >= startOfMonth && d <= endOfMonth;
    }).length;

    const categoryCounts = rows.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + 1;
      return acc;
    }, {});

    const monthlyEvents = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const startDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
      const count = rows.filter((e) => {
        const d = new Date(e.date);
        return d >= startDay && d <= endDay;
      }).length;
      monthlyEvents.push({
        month: date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
        count
      });
    }

    const recentEvents = [...rows]
      .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
      .slice(0, 5);

    const totalViews = rows.reduce((sum, e) => sum + (e.views || 0), 0);

    return {
      data: {
        totalEvents,
        thisMonth,
        categoryCounts,
        monthlyEvents,
        recentEvents,
        totalViews
      }
    };
  }
};

export default eventsService;
