export const getDeviceTypeColor = (type) => {
  const colors = {
    'Laptop': 'bg-blue-100 text-blue-800',
    'PC': 'bg-purple-100 text-purple-800',
    'MacBook': 'bg-gray-100 text-gray-800',
    'Mac Mini': 'bg-gray-100 text-gray-800',
    'Mobile/Tablet': 'bg-green-100 text-green-800',
    'Network Device': 'bg-orange-100 text-orange-800',
    'Other': 'bg-yellow-100 text-yellow-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};
