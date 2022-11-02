import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  // 이러한 React.FormEvent<HTMLInputElement> 같은 것은 혼자 알아내서 적기 힘들다. 따라서
  // 구글링 또는 docs를 찾아본다.
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    // 이 이상한 형태는 es6문법이다. 코드 바깥에서 설명하도록 하겠다.
    // js에서는 e.target을 주로 썼다면 ts에서는 e.currentTarget을 쓴다고한다.
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
