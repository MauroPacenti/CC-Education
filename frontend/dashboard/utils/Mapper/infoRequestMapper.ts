interface InfoRequestData {
  id: number;
  email: string;
  title: string;
  content: string;
  status: {
    id: 1;
    name: string;
  };

  date?: string;
}

/**
 * Maps an array of InfoRequestData objects to a simplified format
 * @param {InfoRequestData[]} data - Array of info request data objects
 * @returns {Array<{id: number, email: string, title: string, content: string, date?: string}>} Mapped array of info requests
 */
const infoRequestMapper = (data: InfoRequestData[]) => {
  return data.map((infoRequest: InfoRequestData) => ({
    id: infoRequest.id,
    email: infoRequest.email,
    title: infoRequest.title,
    content: infoRequest.content,
    date: infoRequest.date,
  }));
};

export default infoRequestMapper;
