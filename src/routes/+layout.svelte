<script lang="ts">
  import { page } from '$app/stores';
  import '$lib/styles/global.sass';
  import '$lib/styles/manageSystem.sass';

  if (typeof window !== 'undefined') {
    import('webfontloader').then((WebFont) => {
      WebFont.load({
        google: {
          families: ['Lato:100,400,700,900', 'Noto Sans KR:100,400,700,900']
        }
      });
    });
  }

  const isManagementPage = $page.url.pathname.includes('/manages');
  const isServicePage = !isManagementPage;
</script>

<div class="app">
  {#if isManagementPage}
    <div class="management-page">
      <slot />
    </div>
  {/if}
  {#if isServicePage}
    <div class="service-page">
      <main>
        <slot />
      </main>
    </div>
  {/if}
</div>
