<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import LinkButton from '$lib/components/LinkButton.svelte';
  let currentRouterPath = '';

  onMount(() => {
    currentRouterPath = window.location.pathname;
  });

  function isCurrentRouter(paths: string[]): boolean {
    return paths.includes(currentRouterPath);
  }

  type LiParentProps = {
    currentRouter?: boolean;
  };
</script>

<nav class="nav">
  <ol>
    <li
      class="item-parent-{isCurrentRouter(['/profile', '/profile-edit']) ? 'active' : 'inactive'}"
    >
      <LinkButton href="/manages/profile">프로필</LinkButton>
      <ol>
        <li class="item-child-{isCurrentRouter(['/manages/profile']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/profile">프로필 보기</LinkButton>
        </li>
        <li class="item-child-{isCurrentRouter(['/manages/profile-edit']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/profile-edit">인적사항 수정</LinkButton>
        </li>
      </ol>
    </li>
    <li
      class="item-parent-{isCurrentRouter(['/manages/military-service', '/manages/education'])
        ? 'active'
        : 'inactive'}"
    >
      <LinkButton href="/manages/military-service">기본사항</LinkButton>
      <ol>
        <li
          class="item-child-{isCurrentRouter(['/manages/military-service'])
            ? 'active'
            : 'inactive'}"
        >
          <LinkButton href="/manages/military-service">병역사항</LinkButton>
        </li>
        <li class="item-child-{isCurrentRouter(['/manages/education']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/education">학력사항</LinkButton>
        </li>
      </ol>
    </li>
    <li
      class="item-parent-{isCurrentRouter([
        '/manages/certificate',
        '/manages/language',
        '/manages/award',
        '/manages/skill'
      ])
        ? 'active'
        : 'inactive'}"
    >
      <LinkButton href="/manages/certificate">능력사항</LinkButton>
      <ol>
        <li class="item-parent-{isCurrentRouter(['/manages/certificate']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/certificate">자격증</LinkButton>
        </li>
        <li class="item-parent-{isCurrentRouter(['/manages/language']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/language">외국어능력</LinkButton>
        </li>
        <li class="item-parent-{isCurrentRouter(['/manages/award']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/award">수상기록</LinkButton>
        </li>
        <li class="item-parent-{isCurrentRouter(['/manages/skill']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/skill">보유기술</LinkButton>
        </li>
      </ol>
    </li>
    <li
      class="item-parent-{isCurrentRouter(['/manages/activity', '/manages/career'])
        ? 'active'
        : 'inactive'}"
    >
      <LinkButton href="/manages/activity">활동사항</LinkButton>
      <ol>
        <li class="item-parent-{isCurrentRouter(['/manages/activity']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/activity">대외활동</LinkButton>
        </li>
        <li class="item-parent-{isCurrentRouter(['/manages/career']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/career">경력사항</LinkButton>
        </li>
      </ol>
    </li>
    <li
      class="item-parent-{isCurrentRouter(['/manages/reference', '/manages/essay'])
        ? 'active'
        : 'inactive'}"
    >
      <LinkButton href="/manages/reference">추가정보</LinkButton>
      <ol>
        <li class="item-parent-{isCurrentRouter(['/manages/reference']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/reference">소셜미디어/홈페이지</LinkButton>
        </li>
        <li class="item-parent-{isCurrentRouter(['/manages/essay']) ? 'active' : 'inactive'}">
          <LinkButton href="/manages/essay">자기소개서</LinkButton>
        </li>
      </ol>
    </li>
    <li><LinkButton href="/">이력서보기</LinkButton></li>
    <!-- <li><button type="button" onClick="{handleSignOut}">로그아웃</button></li> -->
    <!-- <li aria-current="{$page.url.pathname === '/' ? 'page' : undefined}">
      <a href="/">Home</a>
    </li>
    <li aria-current="{$page.url.pathname === '/about' ? 'page' : undefined}">
      <a href="/about">About</a>
    </li>
    <li aria-current="{$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}">
      <a href="/sverdle">Sverdle</a>
    </li> -->
  </ol>
</nav>

<style lang="sass">
  @import 'lib/styles/_designSystem'
  
  nav
    font-size: rem(16)

  .item-parent
    &-active
      & > a
        font-weight: 700
        color: $hex-light

    &-inactive
      & > a
        font-weight: unset
        color: $rgba-light70
      & ol
        display: none

  .li-child
    &-active
      & a
        border-radius: rem(52)
        background-color: $hex-mint
        font-weight: 700
        color: $hex-dark

    &.inactive
      & a
        border-radius: unset
        background-color: unset
        font-weight: unset
        color: $hex-dark
</style>
