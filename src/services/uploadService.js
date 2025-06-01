export async function uploadOrdersService(file){
    const results = [];
    const errors = [];
    let rowCount = 0;

    const stream = Readable.from(req.file.buffer.toString());

    stream
    .pipe(csvParser())
    .on('data', async (row) => {
      rowCount++;
      try {
        const customer = {
          name: row.name,
          email: row.email,
          phone: row.phone || '',
          location: row.location || '',
          externalId: row.customer_external_id || ''
        };

        // Optional: upsert logic
        const existing = await Customer.findOne({ email: customer.email });
        if (existing) {
          Object.assign(existing, customer);
          await existing.save();
        } else {
          await Customer.create(customer);
        }

        results.push(customer);
        } catch (err) {
        errors.push({ row: rowCount, message: err.message });
      }
    })
    .on('end', () => {
      res.status(200).json({
        message: `Processed ${results.length} rows.`,
        results,
        errors,
      });
    })
    .on('error', (err) => {
      res.status(500).json({ error: 'Error parsing CSV file' });
    });
}