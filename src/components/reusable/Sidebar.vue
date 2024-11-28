<template>
  <nav
    v-if="open"
    class="lateral-menu animate__animated animate__fadeInLeft h-full"
  >
    <div class="flex flex-row pt-4 justify-center">
      <img src="@/assets/img/logo_andrea.svg" />
    </div>
    <div class="flex flex-col">
      <div class="flex items-center p-2">
        <img
          class="h-6 w-6 rounded-full"
          src="@/assets/img/menu/RelacionCanales.png"
        />
        <span
          class="text-white text-lg font-semibold ml-2 cursor-pointer select-none hover:bg-white hover:text-andrea"
          @click="onClickSection"
          >{{ name }}</span
        >
      </div>
      <div class="flex item-center ml-4 md:h-200 lg:h-400 overflow-auto">
        <transition
          enter-active-class="animate__fadeInLeft"
          leave-active-class="animate__fadeOutLeft"
        >
          <ul
            v-if="showSubSections"
            class="ul-menu-item animate__animated animate__fadeInLeft"
            @animationend="animate = false"
          >
            <li
              v-for="item in menu"
              :key="item.description"
              @click.stop="hasSubmenu(item)"
            >
              <div class="flex flex-row p-1 items-center cursor-pointer">
                <img
                  class="h-6 w-6 rounded-full mr-1"
                  src="@/assets/img/keyboard_arrow_right.svg"
                />
                <span>{{ item.description }}</span>
              </div>
              <ul v-if="item.submenu.length > 0">
                <li
                  class="hover:bg-white hover:text-andrea mb-2"
                  v-for="(sub, i) in item.submenu"
                  :key="selected + i"
                  :class="{ highlight: sub.description == selected }"
                  @click.stop="onChangeMenu(sub)"
                >
                  <span class="ml-8 cursor-pointer">{{ sub.description }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </transition>
      </div>
    </div>
    <User />
  </nav>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import User from './User.vue';
import { Menu, MenuOption } from '@/types';

@Component({
  components: {
    User,
  },
  name: 'Sidebar',
})
export default class Sidebar extends Vue {
  @Prop(Boolean) public readonly open: boolean;
  @Prop(String) public readonly name: string;
  @Prop(Array) public readonly menu: Menu;

  public selected = null;

  public animate = false;

  public showSubSections = false;

  public hasSubmenu(menu: MenuOption) {
    if (menu.submenu.length > 0) {
      return;
    }

    this.onChangeMenu(menu);
  }

  public onClickSection() {
    this.showSubSections = !this.showSubSections;
    this.animate = true;
  }

  @Emit()
  public onChangeMenu(menu: MenuOption) {
    this.selected = menu.description;
    return menu;
  }
}
</script>
