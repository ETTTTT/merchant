<template>
    <span v-on:click="back" class="backBtn">&nbsp;</span>
</template>
<script>
import router from '../router';

export default {
    name: 'headerLeftBackHome',
    methods: {
        back() {
            // const isFromModel = router.history.current.query.from === 'model';

            // if (isFromModel) {
            //     // router.back(-4);
            //     router.push({
            //         path: '/'
            //     });
            // } else {
            // router.back();
            // }
            router.push({
                path: '/'
            });
        }
    },
};
</script>
