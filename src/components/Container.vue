<template lang="html">
    <div class="viewContainer">
        <loading v-if="loading" :text="loadingText" />
        <slot v-else name="viewContent"></slot>

        <toast :message="toastMsg" />
        <alert :message="error.msg"
                :buttons="alertOpts.buttons"
                :left-btn="alertOpts.leftBtn"
                :right-btn="alertOpts.rightBtn"
                :single-btn="alertOpts.singleBtn" />
    </div>
</template>

<script lang='babel'>
    import { mapGetters, mapActions } from 'vuex';
    import apiErrorHandler from '@/http/apiErrorHandler';

    export default {
        name: 'Container',
        props: {
            loading    : Boolean,
            loadingText: String,
            error      : Object,
            customAlert: Object,
        },
        components: {
            loading: require('@/components/Loading'),
            toast  : require('@/components/Toast'),
            alert  : require('@/components/Alert'),
        },
        computed: {
            ...mapGetters([
                'toastMsg',
                'alertOpts',
            ]),
        },
        methods: {
            ...mapActions(['alert'])
        },
        watch: {
            error: {
                deep: true,
                handler(val) {
                    // val 指向 error 的最新值
                    const errorType = val.type;

                    if (errorType === 'apiError') {
                        apiErrorHandler(this.error);
                    } else if (errorType === 'ajaxError') {
                        const options = {
                            message: val.msg,
                        };

                        // 如果有自定义的alert设置
                        // 则增加到options中
                        if (this.customAlert) {
                            Object.assign(options, this.customAlert);
                        }

                        this.alert(options);
                    }
                },
            },
        },
    };
</script>
