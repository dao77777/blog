# React

[react官网](https://beta.reactjs.org/)

## React渲染流程

1. 纯函数部分：**状态同步** & **状态渲染**
2. 等待监听：**页面交互** & **父组件传递过来的属性** & **本组件的状态改变** & **定时器** & **websocket订阅** & **等等...**
3. 副作用部分：**改变状态** & **开启监听** & **取消监听** & **发布**

## 纯函数

设立映射关系
```jsx
const [stateA, setStateA] = useState(0)
const stateB = useMemo(() => stateA * 2, [stateA]) // 设立stateA与stateB的映射关系
const stateC = useCallback((value) => setStateA(stateB + value), [stateB]) // 设立stateB与stateC的映射关系
```

设立非映射关系
```jsx
const stateA = useState(0)
const preStateA = useStaet(stateA)
preStateA !== stateA && setPreStateA(stateA)

const stateB = useState(3)

if (preStateA !== stateA) { 
  setStateB(stateB + (stateA - preStateA) * 2) // 设立stateA与stateB的非映射关系
}
```

## 副作用

## React Crush Example

```jsx
const ComponentA = ({ stateD, onXXX }) => {
  // 纯函数: 设立状态与状态之间的关系

  const [stateA, setStateA] = useState(0)
  const [preStateA, setPreStateA] = useStaet(stateA)
  preStateA !== stateA && setPreStateA(stateA)

  const stateB = useState(3)
  const stateBRef = useRef(stateB)
  stateBRef.current !== stateB && (stateBRef.current = stateB)

  const stateC = useMemo(() => stateA * 2, [stateA]) // 设立stateA与stateC的映射关系

  if (preStateA !== stateA) { 
    setStateB(stateB + (stateA - preStateA) * 2) // 设立stateA与stateB的非映射关系
    setStateD(stateD + stateB * 2) // 设立stateA与stateD的非映射关系
  }

  const stateE = useCallback(() => {
    // XXX
  }, [stateA, stateB, stateC])

  const stateF = useCallback(() => {
    // XXX
  }, [stateE, stateD])

  // 副作用: 改变状态, 监听, 发布, 取消监听, 副作用里面别用state, 全部用ref

  const lsRemoteRef = useRef(null)
  const handleRemote = () => {
    setStateA(c => c + 2)
  }

  const lsCountDownRef = useRef(null)
  const handleCountDown = () => {
    setStateA(c => (c + 1) * 3 + stateBRef.current)
  }

  const lsClickRef = useRef(true)
  const handleClick = () => {
    if (!lsCickRef.current) return
    clearTimeout(lsCountDownRef.current)
    timer.current = setTimeout(handleCountDown, 1000)
  }

  const handleFocus = (val) => {
    setStateB(val)
  }

  const handleStateCChange = () => {
    onXXX()
  }

  const handleStateDChange = () => {
    if (lsClickRef.current) {
      lsClickRef.current = false
    } else {
      lsClickRef.current = true
    }
  }

  const handleStart = () => {
    lsRemoteRef.current = client.connect()
    lsRemoteRef.current.on('remote', handleRemote)
  }

  useEffect(() => {
    handleStart()

    return () => {
      // 组件卸载时, 在这里清除该组件所有监听
      lsRemoteRef.current.disconnect()
      clearTimeout(lsCountDownRef.current)
    }
  }, [])

  useEffect(() => {
    handleStateCChange()
  }, [stateC])

  useEffect(() => {
    handleStateDChange()
  }, [stateD])

  return (
    <View onClick={() => handleClick()}>
      <View>{stateA}</View>
      <View>{stateB}</View>
      <View>{stateC}</View>
      <View style={{ width: stateA }}>{stateD}</View>
      <ComponentB propsA={stateE} onFocus={(e) => handleFocus(e.detail.value)}></ComponentB>
      <ComponentC propsA={stateF}></ComponentB>
    </View>
  )
}

export default ComponentA
```