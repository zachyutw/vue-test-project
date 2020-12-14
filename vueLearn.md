## v-bind / : attribute

### Vue

```javascript
<template>
    <div v-bind:title="message">
        {{ message }}
    </div>
</template>
<script>
    import { ref } from 'vue';
    export default {
        setup() {
            const message = ref('foo');
            return {
                message,
            };
        },
    };
</script>
```

### React

```JSX
import {useState} from 'react';
export default function(){
    const [message] = useState('');
    return <div title={message}>{message}</div>
}
```

## v-on / @event

### Vue

```javascript
<template>
    <button @click="handleOnClick">
        Click
    </button>
</template>
<script>

    export default {
        setup() {
            const handleOnClick = ()=>{console.log('clicked')}
            return {
                handleOnClick
            };
        },
    };
</script>
```

### React

```JSX
export default function(){
    const handleOnClick = ()=>{console.log('clicked')}
    return <button onClick={handleOnClick}>Clicked</button>
}
```

## v-model & emit

### Vue

```Javascript
<template>
  <div>
    <label>
      Email
      <input type="email" v-model="input" name="email" />
    </label>
    <div v-if="input" v-bind:errors="errors">
      {{ errors }}
    </div>
    <div>
      {{ input }}
    </div>
  </div>
</template>
<script>

import { ref, watch } from "vue";

const isEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email) ? null : "Must be a valid email address";
};

const useInputValidator = (startVal, onValidate) => {
  const input = ref(startVal);
  const errors = ref(null);
  watch(input, (value) => {
    errors.value = onValidate(value);
  });
  return {
    input,
    errors,
  };
};
export default {
  name: "InputEmail",
  props: {
    value: String,
  },
  setup(props, { emit }) {
    const email = ref("");
    const { input, errors } = useInputValidator(email.value, isEmail(), (value) =>
      emit("input", value)
    );
    console.log(emit);
    return {
      input,
      errors,
    };
  },
};
</script>

```

### React

```JSX
import  {useEffect,useState}  from 'react';
const isEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email) ? null : "Must be a valid email address";
};

const useInputValidator = (input, onValidate) => {
  const [errors,setErrors] = useState(null);
  useEffect(()=>{
      setErrors( ()=>onValidate(input) )
  },[input]);

  return {
    input,
    errors,
  };
};

export default function(){
    const [email,setEmail] = useState('');
    const {input,errors} = useInputValidator(email,isEmail)
    const handleOnChange = (e)=>{
        setEmail(e.target.value);
    }
    return <div>
    <label>
      Email
      <input type="email" onChange={handleOnChange} value={email} name="email" />
    </label>
   {errors && <div >
      { errors }
    </div> }
    <div>
      { email }
    </div>
  </div>

}
```

## v-model and emit

### Vue

#### Parent

```Javascript
<template>
<VueEmitInput v-model="message" />
</template>
<script>
import VueEmitInput from "@/components/VueEmitInput.vue";
export default {
  name: "ParentComponent",
  components: {
    VueEmitInput,
  },
  setup() {
    const message = ref("init value");
    watch(message, () => {
      console.log(message.value);
    });
    return {
      message,
    };
  },
}
</script>
```

#### Children

```Javascript
<template>
  <div>
    <!-- emit input first example -->
    <label>
      Emit Input
      <input type="email" name="email" :value="modelValue" @input="onInput" />
    </label>
    <!-- emit input second example -->
    <label>
      Emit Input 2
      <input type="email" name="email" v-model="message" />
    </label>
    <div>
      <p>Message</p>
      {{ message }}
    </div>
  </div>
</template>
<script>
import { computed } from "vue";

export default {
  name: "EmitInput",
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const message = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    const onInput = (event) => emit("update:modelValue", event.target.value);
    return {
      message,
      onInput,
    };
  },
};
</script>

```

## React

### Parent

```JSX
import {useState, useCallback} from 'react';
import ReactInput from '@/components/ReactInput';
const Parent = ()=>{
    const [message,setMessage]= useState('');
    const handleOnChange = useCallback((value)=> setMessage(value),[]);

    return <div>
        <ReactInput onChange={handleOnChange} value={message}>
    </div>
}

export default Parent
```

### Children

```JSX
const ReactInput = ({onChange=()=>{},value})=>{
    const handleOnChange = (e)=>onChange(e.target.value);
    return <div>
        <label>
      Email
      <input type="email" onChange={handleOnChange} value={value} name="email" />
    </label>
    </div>
}
```

## inherit attrs / slot

### Vue

Parent

```Javascript
<template>
    <Button text="Button slot tester" :data-name="123" data-test="test-id" />
    <Button text="Button slot tester" :data-name="123" data-test="test-id">
        Button slot tester
    </Button>
</template>
```

Child

```Javascript
<template>
  <button v-bind="$attrs">
    <slot>{{ text }}</slot>
  </button>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    text: String,
    name: String,
  },
  setup(props) {
    return {};
  },
};
</script>

```

### React

### Parent

```JSX
    const Parent = ()=>{
        return <>
            <Button text="Button slot tester" data-name="123" data-test="test-id"  />
            <Button text="Button slot tester" data-name="123" data-test="test-id" >
                Button slot tester
            </Button>
        </>
    }
```

### Children

```JSX
    const Child = ({text,children,...rest})=>{
        return <button {...rest}>
            {text || children}
        </button>
    }
```


# Vuex
## Vuex vs Redux

- getters === useSelector()
- mutations === reducers
- actions(context,payload)  === actions ()=>()=>{}
- commit === dispatch
- dispatch === dispatch function