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
