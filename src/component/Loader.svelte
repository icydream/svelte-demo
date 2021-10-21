<script>
    import Cover from './Cover.svelte';
    import '../css/spinkit.min.css';    

    export let visible = false;
</script>


<Cover visible={visible} on:click={e => {visible = !e.detail.visible}}>
    <div class="sk-center sk-chase">
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
	</div>
</Cover>