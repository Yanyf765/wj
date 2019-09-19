<template>
    <div>
      <el-row style="height: 840px">
        <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
        <view-switch class="switch"></view-switch>
        <el-form effect="dark" placement="right"
          v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          :key="item.id">
<!--          <p slot="content" style="font-size: 14px;margin-bottom: 6px">{{item.title}}</p>-->
<!--          <p slot="content" style="font-size: 13px;margin-bottom: 6px">-->
<!--            <span>{{item.author}}</span> /-->
<!--            <span>{{item.date}}</span> /-->
<!--            <span>{{item.press}}</span>-->
<!--          </p>-->
<!--          <p slot="content" style="width: 300px;" class="abstract">{{item.abs}}</p>-->
          <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px" class="book"
            shadow="hover" bodyStyle="padding:10px">
            <div class="cover" @click="editBook(item)">
              <img :src="item.cover" alt="封面">
            </div>
            <div class="info">
              <div class="title">
                <a href="">{{item.title}}</a>
              </div>
              <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
            </div>
            <div class="author">{{item.author}}</div>
          </el-card>
        </el-form>
        <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
      </el-row>
      <el-row>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :total="books.length">
        </el-pagination>
      </el-row>
    </div>
</template>

<script>
import SearchBar from './SerachBar'
import ViewSwitch from './ViewSwitch'
import EditForm from './EditForm'
export default {
  name: 'Books',
  data () {
    return {
      books: [],
      currentPage: 1,
      pagesize: 17
    }
  },
  mounted: function () {
    this.loadBooks()
  },
  components: {SearchBar, ViewSwitch, EditForm},
  methods: {
    searchResult () {
      var _this = this
      this.$axios
        .post('/search', {keywords: this.$refs.searchBar.keywords})
        .then(resp => {
          if (resp && resp.status === 200) {
            _this.books = resp.data
          }
        })
    },
    loadBooks () {
      var _this = this
      this.$axios.get('/books').then(resp => {
        if (resp && resp.status === 200) {
          _this.books = resp.data
        }
      })
    },
    editBook (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        press: item.press,
        abs: item.abs,
        category: {
          id: item.category.id.toString(),
          name: item.category.name
        }
      }
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    deleteBook (id) {
      this.$confirm('此操作将永久删除该书籍,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/delete', {id: id}).then(resp => {
          if (resp && resp.status === 200) {
            this.loadBooks()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
  .switch{
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }
  .abstract{
    display: block;
    line-height: 17px;
  }
  .cover{
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }
  .title{
    font-size: 14px;
    text-align: left;
  }
  img{
    width: 115px;
    height: 172px;
  }
  .author{
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }
  .el-icon-delete{
    cursor: pointer;
    float: right;
  }
  a{
    text-decoration: none;
  }
  a:link, a:visited, a:focus{
    color: #3377aa;
  }
</style>
