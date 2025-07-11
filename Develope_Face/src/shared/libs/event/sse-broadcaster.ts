const clients = new Set<ReadableStreamDefaultController>();
const encoder = new TextEncoder(); // TextEncoder 인스턴스 생성

function broadcast(data: any, eventName?: string, eventId?: string) {
  let messageString = "";
  if (eventId) messageString += `id: ${eventId}\n`;
  if (eventName) messageString += `event: ${eventName || 'message'}\n`; // 기본 이벤트 이름 'message'
  messageString += `data: ${typeof data === 'string' ? data : JSON.stringify(data)}\n\n`;

  const messageBytes = encoder.encode(messageString);
  const deadControllers: ReadableStreamDefaultController[] = []; // 제거할 컨트롤러 목록

  clients.forEach((controller) => {
    try {
      // 각 클라이언트에게 메세지를 전송한다  .
      controller.enqueue(messageBytes);
    } catch (e) {
      console.error("Error enqueuing to client (broadcaster), marking for removal:", e);
      // 메세지를 수신하지 않는, error가 발생하는 클라이언트를 모은다.
      deadControllers.push(controller); 
    }
  });

  // 모든 dead 컨트롤러를 clients Set에서 제거한다. 이후 메세지 요청에 포함되지 않는다.
  deadControllers.forEach(controller => clients.delete(controller));
}

export const sseBroadcaster = {
  addClient: (controller: ReadableStreamDefaultController) => {
    clients.add(controller);
    console.log(`[Broadcaster] 클라이언트 추가, 총 클라이언트 Count: ${clients.size}`);
  },
  removeClient: (controller: ReadableStreamDefaultController) => {
    const isDeleted = clients.delete(controller);
    if (isDeleted) {
      console.log(`[Broadcaster] 클라이언트 제거. 총 클라이언트 Count: ${clients.size}`);
    } else {
      // console.log(`[Broadcaster] Attempted to remove client, but not found. Total clients: ${clients.size}`);
    }
  },
  sendEvent: (data: any, eventName?: string, eventId?: string) => {
    broadcast(data, eventName, eventId);
  },
  getClientCount: () => clients.size,
};