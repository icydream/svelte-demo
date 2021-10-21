<script>
    import Notify from './Notify.svelte';
    
	export let type = 'success';
    export let message = '';
    export let visible = false;
</script>

<Notify>
    <Notify type={type} bind:visible={visible}>
		<div slot="success" class={type}>{message}</div>
        <div slot="fail" class={type}>{message}</div>
    </Notify>
</Notify>

<style>
	.success {
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 999;
		background-color: gold;
		font-size: 25px;
		width: 150px;
		text-align: center;
	}
    .fail {
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 999;
		background-color: #ff9966;
		font-size: 25px;
		width: 150px;
		text-align: center;
	}
</style>