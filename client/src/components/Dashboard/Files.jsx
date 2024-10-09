import React from 'react';

const FileList = () => {
  const files = [
    { name: 'Document1.pdf', size: '2MB', date: '2024-08-01' },
    { name: 'Presentation.pptx', size: '5MB', date: '2024-07-15' },
    { name: 'Image.png', size: '1MB', date: '2024-06-30' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Files</h2>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>File Name</th>
              <th style={styles.th}>Size</th>
              <th style={styles.th}>Date Added</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody style={styles.tbody}>
            {files.map((file, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>{file.name}</td>
                <td style={styles.td}>{file.size}</td>
                <td style={styles.td}>{file.date}</td>
                <td style={styles.td}>
                  <button style={styles.button}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f7fafc',
    minHeight: '100vh',
  },
  card: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#2d3748',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  thead: {
    backgroundColor: '#edf2f7',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '14px',
    color: '#4a5568',
    borderBottom: '1px solid #e2e8f0',
  },
  tbody: {
    backgroundColor: '#ffffff',
  },
  tr: {
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '12px',
    fontSize: '14px',
    color: '#4a5568',
  },
  button: {
    color: '#3182ce',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0',
    textDecoration: 'underline',
  },
};

export default FileList;
