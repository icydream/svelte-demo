<script>
    import Cover from './Cover.svelte';

    export let visible = false;
</script>

<Cover visible={visible}>
    <div class="container">
        <slot></slot>
    </div>
</Cover>

<style>
    .container {
        position: relative;
        background-color: white;
        z-index: 101;
    }
</style>