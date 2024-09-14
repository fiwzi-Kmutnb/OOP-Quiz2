<script lang="ts">
  import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import Fa from "svelte-fa";
  import CalculatorDigit from "./lib/utils/CalculatorDigit";
  import BirthdayNumberSearch from "./lib/utils/BirthdayNumberSearch";
  import BirthdayNumberRepository from "./lib/utils/repository/BirthdayNumberRepository";
  import DuoNumberRepository from "./lib/utils/repository/DuoNumberRepository";
  import HomeNumberRepository from "./lib/utils/repository/HomeNumberRepository";
  import DuoNumberSearch from "./lib/utils/DuoNumberSearch";
//   import { ipcRenderer } from "electron";



  const birthdayNumberRepository: BirthdayNumberRepository =
    new BirthdayNumberRepository();
  const duoNumberRepository: DuoNumberRepository = new DuoNumberRepository();
  const homeNumberRepository: HomeNumberRepository = new HomeNumberRepository();
  const calculatorDigit: CalculatorDigit = new CalculatorDigit();
  let isModalOpen: boolean = false;
  let form = {
    houseNumber: "",
    birthDay: "กรุณากเลือกวันเกิด",
  };
  let dataShow: dataShow = {
    rootDigit: "",
    duo: [],
    birthDay: [],
    msg: {
        msg: "",
        recommend: [],
        job: ""
    },
  };
  const showModal = async () => {
    if (form.houseNumber.length <= 0) {
      toasts.add({
        title: "เกิดข้อผิดพลาด",
        description: "กรุณากรอกเลขที่บ้าน",
        type: "warning",
      });
      return;
    }
    if (form.birthDay === "กรุณากเลือกวันเกิด") {
      toasts.add({
        title: "เกิดข้อผิดพลาด",
        description: "กรุณาเลือกวันเกิด",
        type: "warning",
      });
      return;
    }
    toasts.clearAll();
    const rootDigit = calculatorDigit.root(form.houseNumber);
    const address = calculatorDigit.address(form.houseNumber);

    const birthdayNumberSearch: BirthdayNumberSearch = new BirthdayNumberSearch(
      birthdayNumberRepository.data
    );
    const duoNumberSearch: DuoNumberSearch = new DuoNumberSearch(
      duoNumberRepository.data
    );
    const homeNumber = (await homeNumberRepository.data).data;
    dataShow = {
        rootDigit: rootDigit.toString(),
        duo: duoNumberSearch.find(address),
        birthDay: birthdayNumberSearch.find(form.birthDay, rootDigit),
        msg: {
            msg: homeNumber[rootDigit].msg,
            recommend: homeNumber[rootDigit].recommend,
            job: homeNumber[rootDigit].job
        }
    };
    isModalOpen = !isModalOpen;
  };

    const closeApp = () => {
        window.api.closeWindow();
    }
    const minimizeApp = () => {
        window.api.minimizeWindow();
    }


</script>

<ToastContainer placement="bottom-right" let:data>
  <FlatToast {data} />
</ToastContainer>
{#if isModalOpen}
  <div class="fixed bg-[#0000005e] w-full z-50 animation-1">
    <div class="h-screen flex justify-center items-center">
      <div class="modal-box w-8/12 max-w-[500px]">
        <form method="dialog">
          <button
            on:click={() => (isModalOpen = false)}
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >✕</button
          >
        </form>
        <h3 class="text-xl font-bold">เลขมงคลของคุณคือ: {dataShow.rootDigit}</h3>
        <div class="flex flex-col gap-6 mt-5">
            <div>
                <p class=" font-bold text-md">ความหมายตัวเลข:</p>
                <p>- {dataShow.msg.msg}</p>
            </div>
            <div>
                <p class=" font-bold text-md">อาชีพที่เหมาะสม:</p>
                <p>- {dataShow.msg.job}</p>
            </div>
            <div>
            <p class=" font-bold text-md">คำแนะนำการตกแต่ง:</p>
            <ul>
                {#each dataShow.msg.recommend as recommend}
                    <li>- {recommend}</li>
                {/each}
            </ul>
            </div>
            <div>
            <p class=" font-bold text-md">เลขมงคลวันเกิด:</p>
            {#if dataShow.birthDay.length > 0}
                <ul>
                    {#each dataShow.birthDay as birthDay}
                        <li>- {birthDay}</li>
                    {/each}
                </ul>
            {:else}
                <p>- ไม่พบเลขมงคลวันเกิด</p>
            {/if}

            </div>
            <div>
            <p class=" font-bold text-md">เลขคู่มลคล:</p>
            {#if dataShow.duo.length > 0}
                <ul>
                    {#each dataShow.duo as duo}
                        <li>{duo}</li>
                    {/each}
                </ul>
            {:else}
                <p>- ไม่พบเลขคู่มงคล</p>
            {/if}
            </div>
        </div>
      </div>
    </div>
  </div>
{/if}
<div class=" fixed text-white w-full bg-[#833410] cursor-default">
    <div class=" flex gap-3 justify-between px-5 py-1 ">
        <div class="text-[10px] self-center titlebar basis-11/12">
            <div class="flex gap-2">
                <div>
                    <img src="icon.jpg" class=" w-3" alt="">
                </div>
                <div>
                    ค้นหาความมงคลในตัวคุณ
                </div>
            </div>
        </div>
        <div class="basis-1/12">
            <div class="flex gap-3 z-50 justify-end">
                <button on:click={minimizeApp} id="min">-</button>
                <button on:click={closeApp} id="closeBtn">&times;</button>
            </div>
        </div>
    </div>
</div>
<main class="w-full h-screen flex items-center justify-center">
  <div class="max-w-[500px] w-full">
    <div
      class="flex flex-col bg-[#ad6d0dde] w-full p-5 gap-3 rounded-lg shadow-lg"
    >
      <div class="">
        <div class="divider divider-warning">
          <p class="text-center font-bold text-white text-2xl">
            เช็คความมงคลในตัวคุณ
          </p>
        </div>
      </div>
      <div class="w-full">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text font-bold text-md text-white"
              >เลขที่บ้าน:</span
            >
          </div>
          <input
            bind:value={form.houseNumber}
            type="text"
            placeholder="กรอกเลขที่บ้านของท่าน...."
            class="input input-bordered w-full border-0 input-sm"
          />
        </label>
      </div>

      <div class="w-full">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text font-bold text-md text-white"
              >เลือกวันเกิด:</span
            >
          </div>
          <select
            bind:value={form.birthDay}
            class="select select-bordered select-sm"
          >
            <option disabled value="กรุณากเลือกวันเกิด" selected
              >กรุณากเลือกวันเกิด</option
            >
            <option value="วันจันทร์">วันจันทร์</option>
            <option value="วันอังคาร">วันอังคาร</option>
            <option value="วันพุธกลางวัน">วันพุธกลางวัน</option>
            <option value="วันพุธกลางคืน">วันพุธกลางคืน</option>
            <option value="วันพฤหัสบดี">วันพฤหัสบดี</option>
            <option value="วันศุกร์">วันศุกร์</option>
            <option value="วันเสาร์">วันเสาร์</option>
            <option value="วันอาทิตย์">วันอาทิตย์</option>
          </select>
        </label>
      </div>
      <div class="w-full text-center mt-5">
        <button
          on:click={() => showModal()}
          class="btn bg-[#a3e635] hover:bg-[#84cc16] border-0 btn-outline shadow-2xl"
        >
          <p class="flex gap-3">
            <Fa icon={faCircleCheck} />ค้นหาความมงคล
          </p>
        </button>
      </div>
    </div>
  </div>
</main>

<style>
</style>
