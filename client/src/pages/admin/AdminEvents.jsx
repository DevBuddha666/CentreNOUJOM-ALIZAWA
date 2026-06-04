import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import eventsService from '../../services/eventsService';
import EventFormModal from './EventFormModal';
import InfoBanner from '../../components/ui/InfoBanner';
import Spinner from '../../components/ui/Spinner';
import '../pages.css';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const result = await eventsService.getEvents();
      setEvents(result.data);
    } catch (err) {
      setError(err.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement?')) {
      try {
        await eventsService.deleteEvent(id);
        setEvents(events.filter(e => e.id !== id));
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
        alert(`Erreur: ${err.message || 'Impossible de supprimer l\'événement'}`);
      }
    }
  };

  const handleSave = async (eventData) => {
    try {
      if (editingEvent) {
        await eventsService.updateEvent(editingEvent.id, eventData);
      } else {
        await eventsService.createEvent(eventData);
      }
      fetchEvents();
      setShowForm(false);
      setEditingEvent(null);
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement:', err);
      alert(`Erreur: ${err.message || 'Impossible d\'enregistrer l\'événement. Vérifiez les données et réessayez.'}`);
    }
  };

  if (loading) return <Spinner />;

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = events.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="events-management">
      <div className="management-header">
        <div>
          <h3>Gestion des événements</h3>
          <p className="management-header__meta">
            {events.length === 0
              ? 'Aucun événement en base'
              : `${events.length} événement${events.length > 1 ? 's' : ''}${
                  totalPages > 1 ? ` — page ${currentPage} / ${totalPages}` : ''
                }`}
          </p>
        </div>
        <div className="management-header__actions">
          <button
            type="button"
            className="btn-primary btn-admin-primary"
            onClick={() => {
              setEditingEvent(null);
              setShowForm(true);
            }}
          >
            <FiPlus size={18} aria-hidden />
            Nouvel événement
          </button>
        </div>
      </div>

      {error && (
        <InfoBanner variant="error" onDismiss={() => setError(null)}>
          {error}
        </InfoBanner>
      )}

      {events.length === 0 ? (
        <div className="admin-empty">
          <strong>Aucun événement</strong>
          Créez votre premier événement pour l’afficher sur le site public.
        </div>
      ) : (
      <div className="table-wrapper">
        <table className="events-table events-table--admin">
          <thead>
            <tr>
              <th>Image</th>
              <th>Titre</th>
              <th>Date</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th className="events-table__actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEvents.map(event => (
              <tr key={event.id}>
                <td>
                  {event.imageUrl && (
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="table-thumbnail"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/50?text=N/A'}
                    />
                  )}
                </td>
                <td className="truncate">{event.title}</td>
                <td>{new Date(event.date).toLocaleDateString('fr-FR')}</td>
                <td><span className="badge">{event.category}</span></td>
                <td>{event.price > 0 ? `${event.price} DH` : 'Gratuit'}</td>
                <td className="events-table__actions">
                  <div className="events-table__actions-inner">
                  <button
                    type="button"
                    className="btn-edit"
                    onClick={() => {
                      setEditingEvent(event);
                      setShowForm(true);
                    }}
                    aria-label={`Modifier ${event.title}`}
                  >
                    <FiEdit2 size={18} aria-hidden />
                  </button>
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => handleDelete(event.id)}
                    aria-label={`Supprimer ${event.title}`}
                  >
                    <FiTrash2 size={18} aria-hidden />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <FiChevronLeft size={18} aria-hidden />
            Précédent
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            type="button"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
            <FiChevronRight size={18} aria-hidden />
          </button>
        </div>
      )}

      {showForm && (
        <EventFormModal 
          event={editingEvent}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminEvents;
