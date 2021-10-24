<script>
	import Notify from './component/Notify.svelte';
	import Loader from './component/Loader.svelte';
	import Prompt from './component/Prompt.svelte';
	import {} from './utility/router.js';
	import {onMount, onDestroy} from 'svelte';
	import Demo from './view/demo.svelte';
	
	let visible = false;
	let type = 'success';
	let message;
	let loaderShow = false;
	let promptShow = false;
	let inputValues;
	let unsubscribe;
	
	onMount(() => {
		window.addEventListener('locationchange', event => {
			if(event?.detail?.state?.path === 'demo') {
				document.body.innerHTML = '';
				new Demo({
					target: document.body
				});
			}
		});
	});

	onDestroy(() => {
		if(unsubscribe !== undefined) {
			unsubscribe();
		}
	});

	function doNotify(event) {
		type = event.target.dataset.type;
		visible = true;

		if(type === 'success') {
			message = 'success :)';
		} else if(type === 'fail') {
			message = 'fail :(';
		}
	}

	function goToDemo() {
		history.pushState({path: 'demo'}, '', 'demo');
	}
	
</script>

<button data-type="success" on:click|preventDefault={doNotify}>成功訊息</button>
<button data-type="fail" on:click|preventDefault={doNotify}>失敗訊息</button>
<button on:click|preventDefault={function() {loaderShow = !loaderShow}}>開啟Loader</button>
<button on:click|preventDefault={function() {promptShow = !promptShow}}>開啟Prompt</button>
<button on:click|preventDefault={goToDemo}>Go to demo</button>

<Notify type={type} bind:visible={visible}>
	<div slot="success" class="success">{message}</div>
	<div slot="fail" class="fail">{message}</div>
</Notify>

<Loader bind:visible={loaderShow}></Loader>

<Prompt bind:visible={promptShow}>
	<div>
		<p>Hello!</p>
		<input type="text" bind:value={inputValues}>
		<div>
			<button on:click|preventDefault={event => promptShow = !promptShow}>取消</button>
			<button on:click|preventDefault={event => alert(`輸入的是: ${inputValues}`)}>確定</button>
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