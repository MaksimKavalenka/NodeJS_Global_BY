export default class TypeUtils {
  static csvToJson(headers, line) {
    const rawContent = line.toString().split(',');
    const jsonContent = {};
    let contentIndex = 0;

    headers.forEach((header) => {
      jsonContent[header] = '';
      let content = rawContent[contentIndex];

      if (content.slice(0, 1) === '"') {
        jsonContent[header] += content;

        while (content.slice(-1) !== '"') {
          contentIndex += 1;
          content = rawContent[contentIndex];
          jsonContent[header] += `,${content}`;
        }

        jsonContent[header] = jsonContent[header].slice(1, -1);
      } else {
        jsonContent[header] = content;
      }

      contentIndex += 1;
    });

    return jsonContent;
  }

  static isNumber(value) {
    return !Number.isNaN(parseFloat(value)) && Number.isFinite(value);
  }
}
