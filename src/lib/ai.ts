// This is a mock AI analysis function to simulate the backend processing.
export async function analyzeError(trace: string): Promise<{
  errorType: string;
  technology: string;
  suggestions: string[];
  relatedDocs: { title: string; slug: string }[];
}> {
  await new Promise(res => setTimeout(res, 1500));

  if (trace.toLowerCase().includes('nullpointerexception')) {
    return {
      errorType: 'NullPointerException',
      technology: 'Java',
      suggestions: [
        'Check if an object you are accessing is null before using it.',
        'Initialize variables before they are accessed.',
        'Use Optional to avoid null checks explicitly.',
      ],
      relatedDocs: [{ title: 'Linux Basic Commands', slug: 'linux/commands' }],
    };
  }

  if (trace.toLowerCase().includes('cannot read properties of undefined')) {
    return {
      errorType: 'TypeError',
      technology: 'JavaScript/TypeScript',
      suggestions: [
        'An object or variable is undefined when you tried to access its properties.',
        'Check for asynchronous operations that may not have completed.',
        'Ensure the DOM element is available before manipulation if applicable.',
      ],
      relatedDocs: [{ title: 'React Hooks Guide', slug: 'react/hooks' }],
    };
  }
  
  if (trace.toLowerCase().includes('segmentation fault')) {
    return {
      errorType: 'Segmentation Fault',
      technology: 'C/C++',
      suggestions: [
        'Attempting to access memory that the program is not allowed to access.',
        'Check for null pointer dereferences.',
        'Look for buffer overflows when dealing with arrays or strings.',
      ],
      relatedDocs: [],
    };
  }

  return {
    errorType: 'Unknown Error',
    technology: 'Unknown',
    suggestions: ['Could not determine the specific error type from the provided trace. Please provide more context.', 'Check for typos in the error message.'],
    relatedDocs: [{ title: 'Getting Started', slug: 'guides/getting-started' }],
  };
}
