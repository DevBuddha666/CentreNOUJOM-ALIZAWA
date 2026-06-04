export function mapEventRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    startTime: row.start_time,
    endTime: row.end_time ?? '',
    location: row.location,
    category: row.category,
    price: row.price,
    imageUrl: row.image_url ?? null,
    views: Number(row.views) || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function toEventInsert(payload, imageUrl) {
  return {
    title: payload.title,
    description: payload.description,
    date: new Date(payload.date).toISOString(),
    start_time: payload.startTime,
    end_time: payload.endTime || null,
    location: payload.location,
    category: payload.category,
    price: parseFloat(payload.price) || 0,
    image_url: imageUrl
  };
}
