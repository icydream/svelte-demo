<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function click() {
        dispatch('click', {
            visible
        });
    }

    export let visible = false;
</script>

{#if visible}
    <div class="overlay" on:click={click}></div>
    <slot></slot>
{/if}

<style>
    .overlay {
        position: fixed; /* Sit on top of the page content */
        width: 100%; /* Full width (cover the whole page) */
        height: 100%; /* Full height (cover the whole page) */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(75,75,75,0.5); /* Black background with opacity */
        z-index: 100; /* Specify a stack order in case you're using a different order for other elements */
    }
</style>