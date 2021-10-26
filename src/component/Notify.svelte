<script>
    import {fade} from 'svelte/transition';
    export let duration = 3000;
    export let type;
    export let visible = false;

    function turnoff() {
        window.setTimeout(() => {
            visible = false;
        }, duration);

        return true;
    }
</script>

{#if visible && turnoff()}
    <div transition:fade>
        {#if type === 'success'}
            <slot name="success"></slot>
        {:else if type === 'fail'}
            <slot name="fail"></slot>
        {/if}
    </div>
{/if}