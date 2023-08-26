<script lang="ts">
  export let href: string;

  const domainRegex = /http[s]*:\/\/[www.]*domain\.com[/]?/;

  let sameDomain = domainRegex.test(href);

  if (sameDomain) {
    href = href.replace(domainRegex, '/');
  }
</script>

{#if href.startsWith('/')}
  <a {href} {...$$props}><slot /></a>
{:else if !href.startsWith('http')}
  <a {href} {...$$props}><slot /></a>
{:else}
  <a {href} target="_blank" rel="noopener noreferrer nofollow" {...$$props}><slot /></a>
{/if}
