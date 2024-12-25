

app.post('/generate-bill', (req, res) => {
  const { customerName, date, items, total } = req.body;

  const options = {
    format: 'A4',
    orientation: 'portrait',
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '20mm',
      right: '20mm',
    },
  };

  const html = template.replace(/{{([^}]+)}}/g, (match, key) => {
    return data[key] || '';
  });

  pdf.create(html, options).toFile('bill.pdf', (err, res) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error generating PDF');
    } else {
      res.download('bill.pdf');
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});