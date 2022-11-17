function jsonToCsv(items) {
    const header = Object.keys(items[0]);
  
    const headerString = header.join(',');
  
    // handle null or undefined values here
    const replacer = (key, value) => value ?? '';
  
    const rowItems = items.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
  
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
    console.log(csv)
    const blob = new Blob([csv], { type: "text/csv" });
    var datacsv = new File([blob], 'filename.csv');
    return datacsv;
  }
  

  export default jsonToCsv