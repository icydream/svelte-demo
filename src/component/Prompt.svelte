<script>
    import Loader from './Loader.svelte';
    import { createEventDispatcher, afterUpdate } from 'svelte';

    const dispatch = createEventDispatcher();

    afterUpdate(() => {
        let cf = confirm();
        let cc = cancel();

        if(!!cf) {
            cf.addEventListener('click', event => {
                event.preventDefault();
                dispatch('confirm', {
                    values
                });
            });
        }

        if(!!cc) {
            cc.addEventListener('click', event => {
                event.preventDefault();
                dispatch('cancel', event.detail);
                visible = false;
            });
        }
    });

    export let visible = false;
    export let confirm;
    export let cancel;
    export let values;
</script>

{#if visible}
    <Loader visible={true}>
        <div class="container">
            <slot></slot>
        </div>
    </Loader>
{/if}

<style>
    .container {
        position: relative;
        background-color: white;
        z-index: 101;
    }
</style>