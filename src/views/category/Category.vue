<template>
  <div class="wrapper">
    <div class="content">
      <ul>
        <li @click="itemClick">滚动的列表项1</li>
        <li>滚动的列表项2</li>
        <li>滚动的列表项3</li>
        <li>滚动的列表项4</li>
        <li>滚动的列表项5</li>
        <li>滚动的列表项6</li>
        <li>滚动的列表项7</li>
        <li>滚动的列表项8</li>
        <li>滚动的列表项9</li>
        <li>滚动的列表项10</li>
        <li>滚动的列表项11</li>
        <li>滚动的列表项12</li>
        <li>滚动的列表项13</li>
        <li>滚动的列表项14</li>
        <li>滚动的列表项15</li>
        <li>滚动的列表项16</li>
        <li>滚动的列表项17</li>
        <li>滚动的列表项18</li>
        <li>滚动的列表项19</li>
        <li>滚动的列表项20</li>
        <li>滚动的列表项21</li>
        <li>滚动的列表项22</li>
        <li>滚动的列表项23</li>
        <li>滚动的列表项24</li>
        <li>滚动的列表项25</li>
        <li>滚动的列表项26</li>
        <li>滚动的列表项27</li>
        <li>滚动的列表项28</li>
        <li>滚动的列表项29</li>
        <li>滚动的列表项30</li>
        <li>滚动的列表项31</li>
        <li>滚动的列表项32</li>
        <li>滚动的列表项33</li>
        <li>滚动的列表项34</li>
        <li>滚动的列表项35</li>
        <li>滚动的列表项36</li>
        <li>滚动的列表项37</li>
        <li>滚动的列表项38</li>
        <li>滚动的列表项39</li>
        <li>滚动的列表项40</li>
        <li>滚动的列表项41</li>
        <li>滚动的列表项42</li>
        <li>滚动的列表项43</li>
        <li>滚动的列表项44</li>
        <li>滚动的列表项45</li>
        <li>滚动的列表项46</li>
        <li>滚动的列表项47</li>
        <li>滚动的列表项48</li>
        <li>滚动的列表项49</li>
        <li>滚动的列表项50</li>
        <li>滚动的列表项51</li>
        <li>滚动的列表项52</li>
        <li>滚动的列表项53</li>
        <li>滚动的列表项54</li>
        <li>滚动的列表项55</li>
        <li>滚动的列表项56</li>
        <li>滚动的列表项57</li>
        <li>滚动的列表项58</li>
        <li>滚动的列表项59</li>
        <li>滚动的列表项60</li>
        <li>滚动的列表项61</li>
        <li>滚动的列表项62</li>
        <li>滚动的列表项63</li>
        <li>滚动的列表项64</li>
        <li>滚动的列表项65</li>
        <li>滚动的列表项66</li>
        <li>滚动的列表项67</li>
        <li>滚动的列表项68</li>
        <li>滚动的列表项69</li>
        <li>滚动的列表项70</li>
        <li>滚动的列表项71</li>
        <li>滚动的列表项72</li>
        <li>滚动的列表项73</li>
        <li>滚动的列表项74</li>
        <li>滚动的列表项75</li>
        <li>滚动的列表项76</li>
        <li>滚动的列表项77</li>
        <li>滚动的列表项78</li>
        <li>滚动的列表项79</li>
        <li>滚动的列表项80</li>
        <li>滚动的列表项81</li>
        <li>滚动的列表项82</li>
        <li>滚动的列表项83</li>
        <li>滚动的列表项84</li>
        <li>滚动的列表项85</li>
        <li>滚动的列表项86</li>
        <li>滚动的列表项87</li>
        <li>滚动的列表项88</li>
        <li>滚动的列表项89</li>
        <li>滚动的列表项90</li>
        <li>滚动的列表项91</li>
        <li>滚动的列表项92</li>
        <li>滚动的列表项93</li>
        <li>滚动的列表项94</li>
        <li>滚动的列表项95</li>
        <li>滚动的列表项96</li>
        <li>滚动的列表项97</li>
        <li>滚动的列表项98</li>
        <li>滚动的列表项99</li>
        <li>滚动的列表项100</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BS from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'
  BS.use(Pullup)

  export default {
    name: "Category",
    mounted() {
      let bs = new BS('.wrapper',{
        click:true,
        pullUpLoad:true,
        // probeType:0
      })
      bs.on('scroll',(position) => {
        // console.log(position);
      })
      bs.on('pullingUp',() => {
        console.log('上拉加载');


        bs.finishPullUp()
      })

    },
    methods:{
      itemClick(){
        console.log(".................");
      }
    }
  }
</script>

<style scoped>
  .wrapper{
    height: 150px;
    background: #ccc;
    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
