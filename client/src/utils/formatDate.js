export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateShort = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR');
};

export const getDayName = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', { weekday: 'long' });
};


export const getMonthInitials = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', { month: 'short' });
};
