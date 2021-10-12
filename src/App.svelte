<script>
	import Notify from './component/Notify.svelte';
	import Loader from './component/Loader.svelte';
	import Prompt from './component/Prompt.svelte';
	import './css/spinkit.min.css';
	
	let visible = false;
	let type = 'success';
	let message;
	let loaderShow = false;
	let promptShow = false;
	let btnCancel;
	let btnConfirm;
	let inputText;

	function doNotify(event) {
		type = event.target.dataset.type;
		visible = true;

		if(type === 'success') {
			message = 'success :)';
		} else if(type === 'fail') {
			message = 'fail :(';
		}
	}
</script>

<button data-type="success" on:click|preventDefault={doNotify}>成功訊息</button>
<button data-type="fail" on:click|preventDefault={doNotify}>失敗訊息</button>
<button on:click|preventDefault={function() {loaderShow = !loaderShow}}>開啟Loader</button>
<button on:click|preventDefault={function() {promptShow = !promptShow}}>開啟Prompt</button>

<Notify type={type} bind:visible={visible}>
	<div slot="success" class="success">{message}</div>
	<div slot="fail" class="fail">{message}</div>
</Notify>

<Loader bind:visible={loaderShow} on:click={function(event) {loaderShow = !event.detail.visible}}>
	<div class="sk-center sk-chase">
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
		<div class="sk-chase-dot"></div>
	</div>
</Loader>

<Prompt
	bind:visible={promptShow}
	cancel={() => btnCancel}
	confirm={() => btnConfirm}
	values={{inputText}}
	on:cancel={event => alert('cancel')}
	on:confirm={event => alert(`輸入的是${event.detail.values.inputText}`)}>
	<div>
		<p>Hello!</p>
		<input type="text" bind:value={inputText}>
		<div>
			<button bind:this={btnCancel}>取消</button>
			<button bind:this={btnConfirm}>確定</button>
		</div>
	</div>
</Prompt>

<style>
	.success {
		position: fixed;
		top: 0;
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