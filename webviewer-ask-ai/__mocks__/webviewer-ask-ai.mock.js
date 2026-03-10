const MOCK_RESPONSES = {
  DOCUMENT_QUESTION: 'In 2011, Rosneft undertook several social responsibility initiatives, including: 1. Support for education by providing RUB 141 million to higher education institutions and extending loans totaling RUB 3.6 million to 97 workers for educational courses. 2. Charity efforts focused on socio-economic projects, healthcare, education, culture, and sports, with a total spending of RUB 2.9 billion on charity. 3. Maintenance of social infrastructure, with spending of RUB 1.0 billion aimed at optimizing facilities for employees and communities [14][15].',
  SELECTED_TEXT_SUMMARY: 'The Tuapse license area covers 12,000 square km in the Black Sea and has geological similarities to the West-Kuban Trough, a historic oil production region in Russia [6]. The Tuapse Block has undergone comprehensive 2D seismic work, with the most promising areas also analyzed using 3D seismic technology [6]. Current data indicates the presence of 20 promising structures with an estimated 8.9 billion barrels of recoverable oil resources [6].'
};

export const isMockingModeEnabled = () => {
  if (typeof window !== 'undefined')
    return window.MODE_ENV === 'mocking';

  return process.env.NODE_ENV === 'mocking';
};

export const getMockChatResponse = (promptLine) => {
  const mockResponse = MOCK_RESPONSES[promptLine] || '';

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockResponse);
    }, 1000);
  });
};