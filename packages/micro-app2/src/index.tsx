import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

(window as any).__webpack_public_path__ =
  (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || '';

console.log(
  '__INJECTED_PUBLIC_PATH_BY_QIANKUN__',
  (window as any).__webpack_public_path__
);
let root: ReactDOM.Root;
const render = (props: any) => {
  const mountNode = props.container
    ? props.container.querySelector('#root')
    : document.getElementById('root');
  root = ReactDOM.createRoot(mountNode);
  root.render(<App />);
};

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  console.log('micro-app2 props:', props);
  props.log('micro-app2 log passed by props');
  props.onGlobalStateChange((state: any, prev: any) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('micro-app2 onGlobalStateChange', state, prev);
  });

  // props.setGlobalState(state);
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: any) {
  root?.unmount();
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
  console.log('update props', props);
}
