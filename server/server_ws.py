import asyncio
import websockets


connected = {}
cnt = 0


def inc_cnt():
    global cnt
    cnt = cnt + 1
    return cnt


async def handler(websocket, path):

    key = inc_cnt()
    connected[key] = websocket

    try:

        if len(connected) >= 2:
            for k, v in connected.items():
                await v.send('"ready"')

        while True:
            msg = await websocket.recv()
            print('received msg')
            print(msg)
            for k, v in connected.items():
                if k != key:
                    await v.send(msg)

    finally:
        print('Remove Websocket: ' + str(key))
        connected.pop(key)


def start_ws():
    print('ws before')
    loop = asyncio.get_event_loop()
    try:

        # web socket server - signaling for webrtc
        loop.run_until_complete(websockets.serve(handler, "0.0.0.0", 8769))
        loop.run_forever()

    except KeyboardInterrupt:
        pass

    finally:
        print("Closing Loop")
        loop.close()

    print('ws after')


if __name__ == '__main__':

    start_ws()
