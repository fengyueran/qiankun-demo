import React, { useRef } from 'react';
import styled from 'styled-components';
import {
  MicroApp,
  loadMicroApp,
  initGlobalState,
  MicroAppStateActions,
} from 'qiankun';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Button = styled.button`
  margin: 20px;
`;

const FlexBox = styled.div`
  display: flex;
`;

const AppContainer = styled.div`
  width: 50vw;
  height: 100vh;
  border: 1px solid;
`;

const actions: MicroAppStateActions = initGlobalState({});

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('Main app onGlobalStateChange', state, prev);
});

// actions.offGlobalStateChange();

function App() {
  const microApp1Ref = useRef<MicroApp>();
  const microApp2Ref = useRef<MicroApp>();
  return (
    <Container>
      <FlexBox>
        <Button
          onClick={() => {
            microApp1Ref.current = loadMicroApp({
              name: 'micro-app1',
              entry: '//localhost:3001',
              container: '#micro-app1',
              props: {
                log: (message: any) => console.log(message),
              },
            });
            setTimeout(() => {
              actions.setGlobalState({ message: 'send message from main' });
            }, 1000);
          }}
        >
          LoadMicroApp1
        </Button>
        <Button
          onClick={() => {
            microApp2Ref.current = loadMicroApp({
              name: 'micro-app2',
              entry: '//localhost:3002',
              container: '#micro-app2',
              props: {
                log: (message: any) => console.log(message),
              },
            });
          }}
        >
          LoadMicroApp2
        </Button>
        <Button
          onClick={() => {
            microApp1Ref.current?.unmount();
          }}
        >
          Unmount MicroApp1
        </Button>
        <Button
          onClick={() => {
            microApp2Ref.current?.unmount();
          }}
        >
          Unmount MicroApp2
        </Button>
      </FlexBox>

      <FlexBox>
        <AppContainer id="micro-app1">
          MicroApp1 容器:http://localhost:3001
        </AppContainer>
        <AppContainer id="micro-app2">
          MicroApp2 容器:http://localhost:3002
        </AppContainer>
      </FlexBox>
    </Container>
  );
}

export default App;
