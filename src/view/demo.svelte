<script>
    import {invokeAPI} from '../utility/invokeAPI.js';
    import {onMount} from 'svelte';

    const titles = ['備註', '公車業者', '去程', '回程', '路線', '路線圖', '路線說明'];
    let dataList = [];

    onMount(() => {
        invokeAPI('https://datacenter.taichung.gov.tw/swagger/OpenData/8ff7d524-9542-49b4-bed1-af7706813e9b')
			.then(resp => resp.success(data => data.then(content => dataList = content)).fail(console.error));
    });
</script>

<table>
	<thead>
		<tr>
			{#each titles as title}
				<th>{title}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each dataList as data, i}
			<tr>
				{#each titles as title}
					<td>{data[title]}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>