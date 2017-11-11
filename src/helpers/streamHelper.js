import combinedStream from 'combined-stream';

export default class StreamUtils {
  static combineStreams(streams, resource) {
    const streamPipe = combinedStream.create();
    streams.forEach((stream) => {
      streamPipe.append(stream);
    });
    return streamPipe.append(resource);
  }
}
