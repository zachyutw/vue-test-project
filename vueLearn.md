## v-bind

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
