<script lang="ts">
	import "./_setting.css";
	import * as Setting from "./_setting.js";
</script>

<main>
	<h1>Personal Setting</h1>
	<div class="settings">
		<div class="blocks">
			<h2>Start up</h2>
			<div class="content">
				<p>Start up</p>
				<Setting.Select.Root>
					<Setting.Select.Trigger>
						<Setting.Select.Value placeholder="Start up" />
					</Setting.Select.Trigger>
					<Setting.Select.Content>
						<Setting.Select.Item value="default">Default page</Setting.Select.Item>
						<Setting.Select.Item value="default">Blank page</Setting.Select.Item>
						<Setting.Select.Item value="default">Previous page</Setting.Select.Item>
					</Setting.Select.Content>
				</Setting.Select.Root>
			</div>
			<div class="content">
				<p>Default page</p>
				<Setting.Select.Root>
					<Setting.Select.Trigger>
						<Setting.Select.Value placeholder="Default page" />
					</Setting.Select.Trigger>
					<Setting.Select.Content>
						<Setting.Select.Item value="default">Home</Setting.Select.Item>
						<Setting.Select.Item value="default">Search</Setting.Select.Item>
						<Setting.Select.Item value="default">Library</Setting.Select.Item>
					</Setting.Select.Content>
				</Setting.Select.Root>
			</div>
		</div>
	</div>
</main>