import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface state {
  screen: string;
  home: string[] | string;
  about: string[] | string;
  service: string[] | string;
  contact: string[] | string;
  themeId: string;
}

const state: state = {
  themeId: "",
  screen: "xl",
  home: [
    `<div>
  <div
  
    class="header-editable"
  >
    <div class="content-header-632ih7">
      <div class="logo-cont">LOGO</div>
      <div class="nav-bar">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Content</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="header-editable">
    <img
      src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/506524b5fe295a46bca10adb/vcvv-min.jpg"
      alt="container banner"
    />
  </div>
  
  <div class="header-editable">
    <div class="content-tt-8327">
      <div title="click to edit">
        <p
          contentEditable
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
          vero iusto aspernatur quasi iure blanditiis tempora corrupti
          voluptatem! Dicta illum expedita, ipsam consectetur doloribus
          ab exercitationem mollitia aperiam repellat ipsum.
        </p>
        <p contentEditable>
          A debitis ratione consectetur ab ut voluptates iusto natus
          culpa corporis, distinctio reiciendis laborum minima, fugiat
          neque ? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Error, velit quasi voluptatum laboriosam
        </p>
      </div>
  
      <div class="contanet-r-324">
        <img src="https://source.unsplash.com/random/500x500/?gamer" />
      </div>
    </div>
  </div>
  
  <div class="header-editable ">
    <h1 contentEditable>Section Heading</h1>
    <div class="card-box-212">
     
        <div class="content-card">
          <div class="card-media">
            <img
              src="https://source.unsplash.com/random/300x300/?cyberpunk"
              alt="card-image"
            />
          </div>
          <div class="card-content" contentEditable>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus eaque corrupti sequi doloremque. Laudantium,
            delectus assumenda. Ad corrupti quisquam commodi consequatur
            reprehenderit nulla et! Velit alias quia earum voluptate
            consequatur!
          </div>
        </div>
  
        <div class="content-card">
          <div class="card-media">
            <img
              src="https://source.unsplash.com/random/300x300/?cyberpunk"
              alt="card-image"
            />
          </div>
          <div class="card-content" contentEditable>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus eaque corrupti sequi doloremque. Laudantium,
            delectus assumenda. Ad corrupti quisquam commodi consequatur
            reprehenderit nulla et! Velit alias quia earum voluptate
            consequatur!
          </div>
        </div>
  
        <div class="content-card">
          <div class="card-media">
            <img
              src="https://source.unsplash.com/random/300x300/?cyberpunk"
              alt="card-image"
            />
          </div>
          <div class="card-content" contentEditable>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus eaque corrupti sequi doloremque. Laudantium,
            delectus assumenda. Ad corrupti quisquam commodi consequatur
            reprehenderit nulla et! Velit alias quia earum voluptate
            consequatur!
          </div>
        </div>
   
    </div>
  </div>
  
  <div class="header-editable ">
    <h1 contentEditable>Section Heading</h1>
  
    <div class="content-tfdst-13123">
      <div class="container-image-tfdst-13123">
        <img
          src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/b13f8a023ad559cba49ceb51/dfdfdffff-min.jpg"
          alt="as"
        />
      </div>
      <div class="container-text-tfdst-13123">
        <h3 contentEditable>Technology</h3>
        <h1 contentEditable>Virtual Reality</h1>
  
        <p>
          There are only some symptoms such as dizziness, depression,
          and collapse that appear while the VR experience. The
          technology is still new and requires investigation and
          research.
        </p>
  
        <hr />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Ratione labore, harum aut quaerat qui nostrum laudantium sunt
          suscipit repudiandae maxime laboriosam consectetur. Aspernatur
          qui vitae autem minima nisi incidunt repellat.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nesciunt natus hic debitis tempora a, qui consectetur autem
          facere, possimus odit reiciendis voluptatibus nobis
          consequuntur fugit voluptas ut eaque! Provident, ullam!
        </p>
      </div>
    </div>
  </div>
  
  <div class="header-editable ">
    <div class="content-mau-7868">
      <div class="content-bb-7868">
        <div class="content-text-7868">
          <h3 contentEditable>Technology</h3>
          <p>The benefits of virtual reality</p>
  
          <button
            contentEditable
          >
            Check
          </button>
        </div>
        <div class="content-image-7868">
          <img src="/contte-638.png" alt="csac" />
        </div>
      </div>
    </div>
  </div>
  
  <div class="header-editable">
    <div class="contenet-fsa-sda">
      <h1>FOLLOW US !</h1>
  
    </div>
  </div>
  </div>`,
  ],
  about: [
    `<div class="about">
  <div class="header-editable">
    <div class="content-header-632ih7">
      <div class="logo-cont">LOGO</div>
      <div class="nav-bar">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Content</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="container-about-breadcrumbs">
    <div class="bread-crumbs">
      <p>
        <span>Home</span> / <span>About</span>
      </p>
    </div>
  </div>

  <div class="containeer-about-headinf">
    <h1>About Page</h1>
  </div>

  <div class="container-main-bout">
    <div class="banner">
      <img
        src="https://source.unsplash.com/random/300x400/?cyberpunk"
        alt="about page"
      />
    </div>

    <div class="tetx">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod
        libero deserunt distinctio sapiente quisquam corrupti, nobis
        provident placeat odio modi eum ad voluptas adipisci quas, porro
        error mollitia aliquam harum. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Quod libero deserunt distinctio
        sapiente quisquam corrupti, nobis provident placeat odio modi
        eum ad voluptas adipisci quas, porro error mollitia aliquam
        harum.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
        repellat adipisci facilis dolores aut? Facilis blanditiis
        placeat nihil id architecto inventore, deserunt consectetur
        aliquid numquam eaque delectus alias aspernatur dolore! Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Quod libero
        deserunt distinctio sapiente quisquam corrupti, nobis provident
        placeat odio modi eum ad voluptas adipisci quas, porro error
        mollitia aliquam harum.
      </p>
    </div>
  </div>
</div>`,
  ],
  contact: [],
  service: [
    `       <div class="about">
  <div class="header-editable">
    <div class="content-header-632ih7">
      <div class="logo-cont">LOGO</div>
      <div class="nav-bar">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Content</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="service-container-asdas">
    <div class="image-sa">
      <img src="/ss.png" alt="as" />
    </div>

    <div class="text-sa">
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Aspernatur
      </h1>
      <h1>Lorem ipsum dolor sit amet dolor sit amet</h1>
    </div>
  </div>

  <div class="service-3GDYH3">
    <div class="containeer-about-headinf">
      <h1>Our Services</h1>
    </div>

    <div class="conn">
     
        <div class="tag-habdler">
          <img
            src="https://source.unsplash.com/random/500x500/?csgo&${Math.random()
              .toString(36)
              .substring(7)}.webp"
          />
        </div>
        <div class="tag-habdler">
          <img
            src="https://source.unsplash.com/random/500x500/?csgo&${Math.random()
              .toString(36)
              .substring(7)}.webp"
          />
        </div>
        <div class="tag-habdler">
          <img
            src="https://source.unsplash.com/random/500x500/?csgo&${Math.random()
              .toString(36)
              .substring(7)}.webp"
          />
        </div>
        <div class="tag-habdler">
          <img
            src="https://source.unsplash.com/random/500x500/?csgo&${Math.random()
              .toString(36)
              .substring(7)}.webp"
          />
        </div>
        <div class="tag-habdler">
          <img
            src="https://source.unsplash.com/random/500x500/?csgo&${Math.random()
              .toString(36)
              .substring(7)}.webp"
          />
        </div>
        <div class="tag-habdler">
          <img
            src="https://source.unsplash.com/random/500x500/?csgo&${Math.random()
              .toString(36)
              .substring(7)}.webp"
          />
        </div>
        <div class="tag-habdler">
          <img
            src="https://source.unsplash.com/random/500x500/?csgo&${Math.random()
              .toString(36)
              .substring(7)}.webp"
          />
        </div>
        <div class="tag-habdler">
          <img
            src="https://source.unsplash.com/random/500x500/?csgo&${Math.random()
              .toString(36)
              .substring(7)}.webp"
          />
        </div>
    </div>
  </div>
</div>`,
  ],
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState: state,
  reducers: {
    WINDOW_SIZE: (state, action: PayloadAction<string>) => {
      state.screen = action.payload;
    },
    LAYOUT_HEADER: (state, action: PayloadAction<string | string[]>) => {
      state.home = action.payload;
    },
  },
});

export const { WINDOW_SIZE, LAYOUT_HEADER } = layoutSlice.actions;

export default layoutSlice.reducer;
