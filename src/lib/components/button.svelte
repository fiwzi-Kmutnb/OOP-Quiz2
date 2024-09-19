<script lang="ts">
  import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  export let onClick: () => void;
</script>

<button
    on:click={onClick}
  class="btn bg-[#a3e635] hover:bg-[#84cc16] border-0 btn-outline shadow-2xl"
>
  <p class="flex gap-3">
    <slot/>
  </p>
</button>
