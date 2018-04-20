<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Sản Phẩm
        <small>quản lý sản phẩm</small>
      </h1>
    </section>
  
    <!-- Main content -->
    <section class="content row">
      <div class="col-xs-7 content--list">
        <div class="box box-solid box-no-header">

            <div class="box-body">              
              <datatable v-bind="$data">
                <button class="btn btn-default" @click="alertSelectedUids" :disabled="!selection.length">
                  <i class="fa fa-commenting-o"></i>
                  Alert selected id(s)
                </button>
                <button class="btn btn-success pull-right" @click="clearFilters" style="margin: 0 5px;">
                  <i class="fa fa-times"></i>
                  Xoá filters
                </button>
              </datatable>
            </div>

            <div class="box-footer">              
              <p><code>{{ queryDisplay }}</code></p>
            </div>
            
            <div id="table-overlay" class="overlay">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
          </div>
      </div>
      <div class="col-xs-5 content--detail">        
        <div class="box box-solid box-default box-no-header">                   
          <div class="box-body">            
              <div class="row">
                <div class="col-xs-8">                 
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-leaf"></i></span>
                    <input name="name" type="text" class="form-control" placeholder="tên sản phẩm" maxlength="30" :disabled="disableInputs">
                  </div>
                </div>
                <div class="col-xs-4">                  
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-product-hunt"></i></span>
                    <input name="amount" type="number" class="form-control" placeholder="còn" step="1" min="0" :disabled="disableInputs">
                  </div> 
                </div>
              </div>
              <div class="row m-top-10">
                <div class="col-xs-6">                  
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-dollar"></i></span>
                    <input name="unit-price" type="number" class="form-control money" placeholder="đơn giá" min="0" :disabled="disableInputs">
                    
                  </div> 
                </div>
                <div class="col-xs-6">                                  
                  <div class="input-group">
                    <span class="input-group-addon"><i class="fa fa-dollar"></i></span>
                    <input name="sale-price" type="number" class="form-control money" placeholder="khuyến mãi" min="0" :disabled="disableInputs">
                  </div>
                </div>
              </div>
              <div class="form-group m-top-10">
                <textarea id="product-desc" class="form-control" rows="3" placeholder="mô tả về sản phẩm..." :disabled="disableInputs"></textarea>
              </div>
              <div class="row m-top-10">
                <div class="col-xs-6">
                  <div class="form-group">
                    <label for="bigImg" class="btn btn-default btn-sm btn-block">
                      <i class="fa fa-image"></i>
                      <span id="big-img-name">Hình cỡ lớn</span>
                    </label>
                    <input style="display: none;" type="file" id="bigImg" accept="image/*" @change="showProductImg($event, 'product--big_img', 'big-img-name')" :disabled="disableInputs">
                    <p class="help-block img-picker-helper">nên dùng 800 x 600px</p>
                  </div>
                  <div class="img-show">
                    <img id="product--big_img" src="../assets/imgs/no_image.png" />
                  </div> 
                  <div id="progress-big-img" class="progress progress-xxs active">
                    <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">                               
                    </div>
                  </div>               
                </div>
                <div class="col-xs-6">
                  <div class="form-group">
                    <label for="thumbImg" class="btn btn-default btn-sm btn-block">
                      <i class="fa fa-image"></i>
                      <span id="thumb-img-name">Hình cỡ nhỏ</span>
                    </label>
                    <input style="display: none;" type="file" id="thumbImg" accept="image/*" @change="showProductImg($event, 'product--thumb_img', 'thumb-img-name')" :disabled="disableInputs">
                    <p class="help-block img-picker-helper">nên dùng 320 x 240px</p>
                  </div>
                  <div class="img-show">
                    <img id="product--thumb_img" src="../assets/imgs/no_image.png" />
                  </div>  
                  <div id="progress-thumb-img" class="progress progress-xxs active">
                    <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">                               
                    </div>
                  </div>              
                </div>
              </div>
              <div class="input-group m-top-10">
                <label style="color: #737373;">
                  <input id="on-sale" type="checkbox" class="minimal-red" checked>
                  Bày bán trong cửa hàng
                </label>
              </div>
              <p class="text-danger" v-if="productError" >
                {{productError}}
              </p>
          </div>
          <div class="box-footer" style="padding: 5px 10px;">
            <button style="margin-right: 10px;" id="btn-add-product" class="btn btn-sm btn-primary pull-left" @click="btnAddClicked">
              <i class="fa fa-plus"></i>
              <span>Thêm mới</span>
            </button>
            <button id="btn-cancel" class="btn btn-sm btn-danger pull-left" @click="cancelAddProduct" v-if="addMode">
              <i class="fa fa-times"></i>
              <span>Huỷ bỏ</span>
            </button>
            <button class="btn btn-sm btn-danger pull-right" @click="deleteProduct()" v-if="selectedRowID">Xoá bỏ</button>
            <button id="btn-update" class="btn btn-sm btn-success pull-right" @click="addOrUpdateProduct(1)" v-if="selectedRowID" style="margin-right: 10px;">Cập nhật</button>
          </div>
          
          <div id="detail-overlay" class="overlay">
            <i class="fa fa-spinner fa-spin"></i>
          </div>

        </div>
      </div>  
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import Vue from "vue";
import components from "./comps/";
import { DatatableHelper } from "../helpers/datatable-helper";
import { db, storage } from "../helpers/firebase-helper";
import { resolve, reject, Promise } from "bluebird-lst";

export default {
  components,
  data: function() {
    return {
      tblClass: "vue2-datatable table-bordered",
      tblStyle: "color: #666",
      pageSizeOptions: [10, 15, 20],
      fixHeaderAndSetBodyMaxHeight: 200,
      tblStyle: "table-layout: fixed", // must
      columns: [
        {
          title: "Tên SP",
          field: "name",
          thComp: "FilterTh",
          tdComp: "NameWithDataAttrs"
        },
        {
          title: "Bán",
          field: "onSale",
          sortable: true,
          tdComp: "Enable",
          colStyle: { width: "60px", padding: 0 }
        },
        {
          title: "Đ/ giá",
          field: "unitPrice",
          sortable: true,
          tdComp: "Currency",
          explain: "Giá đơn vị",
          colStyle: { width: "100px" }
        },
        {
          title: "K/ mãi",
          field: "salePrice",
          sortable: true,
          tdComp: "Currency",
          explain: "Giá khuyến mãi",
          colStyle: { width: "100px" }
        },
        {
          title: "Còn",
          field: "amount",
          sortable: true,
          tdComp: "NumberDisplay",
          explain: "Số lượng có thể cung cấp",
          colStyle: { width: "75px" }
        },
        {
          title: "Rate",
          field: "ratings",
          tdComp: "Rating",
          explain: "Đánh giá của khách hàng",
          colStyle: { width: "70px" }
        }
      ],
      data: [],
      total: 0,
      selection: [],
      query: {},
      xprops: {
        eventbus: new Vue()
      },
      firebaseArray: [],
      queryDisplay: "",
      selectedRowID: null,
      selectedRow: {
        id: '', name: '', unitPrice: '', salePrice: '', onSale: true, amount: 0, image: '', thumbnail: ''
      },
      addMode: false,
      productError: null
    };
  },
  mounted: function() {
    this.$bindAsArray(
      "firebaseArray",
      db
        .ref()
        .child("Products")
        .orderByChild("id")
    );
    this.setRowEventListeners();
    $(
      'input[type="checkbox"].minimal-red, input[type="radio"].minimal-red'
    ).iCheck({
      checkboxClass: "icheckbox_minimal-red",
      radioClass: "iradio_minimal-red"
    });
  },
  watch: {
    addMode: function(value) {
      $("#btn-add-product span").text(value ? "Đồng ý" : "Thêm mới");
      $("#btn-add-product i").attr(
        "class",
        value ? "fa fa-check" : "fa fa-plus"
      );
    },
    query: {
      handler() {
        this.handleQueryChange();
      },
      deep: true
    },
    firebaseArray: {
      handler() {
        this.handleQueryChange();
      },
      deep: true
    },
    selectedRowID: {
      handler(value) {
        if (!value) return
        this.$bindAsObject("selectedRow", db.ref().child(`Products/${value}`))
        this.showSelectedProduct()
      }
    }
  },
  computed: {
    disableInputs: function() {
      return !this.addMode && !this.selectedRowID;
    }
  },
  methods: {
    handleQueryChange() {
      $("#table-overlay").show();
      DatatableHelper.fillTable(this.firebaseArray, this.query).then(
        ({ rows, total, queryDisplay }) => {
          this.data = rows.map(row => {
            row.ratings = this.ratingCalc(row.ratings);
            return row;
          });
          this.total = total;
          this.queryDisplay = queryDisplay;
          setTimeout(() => $("#table-overlay").hide(), 300);
        }
      );
    },
    alertSelectedUids() {
      alert(this.selection.map(({ id }) => id));
    },
    ratingCalc(ratings) {
      if (!ratings) return 3;
      let total = 0;
      let count = 0;

      for (var key in ratings) {
        if (ratings.hasOwnProperty(key)) {
          count++;
          let rating = ratings[key];
          let value = rating.value;
          total += value;
        }
      }
      return Math.round(total * 10 / count) / 10;
    },
    clearFilters() {
      this.query = { limit: 10, offset: 0, sort: '', order: '' }
    },
    setRowEventListeners() {
      let vue = this;
      $(".vue2-datatable").on("click", "tr", function() {        
        if (vue.addMode) return
        let rowID = $(this).attr("data-row-id");
        vue.selectedRowID = rowID
      });
    },
    showProductImg(event, imgElementID, lableElementID) {
      if (event.target.value.length <= 0) return; // not pick an image
      let output = document.getElementById(imgElementID);
      output.src = URL.createObjectURL(event.target.files[0]);
      let fileName = event.target.files[0].name;
      $(`#${lableElementID}`).text(fileName);
    },
    btnAddClicked() {   

      if (!this.addMode) {
        this.addMode = true
        this.selectedRowID = null
        this.clearInput()
        return false;
      }
      // on addMode selectedRowID will be null
      // add new product
      this.addOrUpdateProduct(0);
    },
    async addOrUpdateProduct(mode) {
      this.productError = null;
      

      let name = $('input[name="name"]').val();
      if (!name) {
        this.productError = "Chưa điền tên sản phẩm";
        return;
      }

      let amount = $('input[name="amount"]').val();
      if (!amount) {
        this.productError = "Chưa điền số lượng hiện có";
        return;
      }

      let unitPrice = $('input[name="unit-price"]').val();
      if (!unitPrice) {
        this.productError = "Chưa điền đơn giá sản phẩm";
        return;
      }

      let salePrice = $('input[name="sale-price"]').val();

      let desc = $("#product-desc").val();
      

      if ($("input#bigImg").get(0).files.length === 0 && mode == 0) {
        this.productError = "Chưa chọn hình cỡ lớn";
        return;
      }

      if ($("input#thumbImg").get(0).files.length === 0 && mode == 0) {
        this.productError = "Chưa chọn hình cỡ nhỏ";
        return;
      }

      let onSale = $("input#on-sale").is(":checked") ? true : false;

      //
      if (!this.productError) {
        // add or update product
        

        let product = {
          name: name,
          amount: amount,
          describe: desc,
          unitPrice: unitPrice,
          salePrice: salePrice,
          onSale: onSale,
          id: "",
          image: "",
          thumbnail: "",
          imageRef: '',
          thumbnailRef: ''
        };
        $('#detail-overlay').show() 
        if (mode == 0) {
          // add new product
          let bigImg = $("input#bigImg").get(0).files[0]
          let thumbImg = $("input#thumbImg").get(0).files[0]

          let bigImgInfo = await this.uploadImages(bigImg, "#progress-big-img")
          let thumbImgInfo = await this.uploadImages(thumbImg, "#progress-thumb-img")

          product.image = bigImgInfo.imageURL
          product.thumbnail = thumbImgInfo.imageURL
          
          product.imageRef = bigImgInfo.imageRef
          product.thumbnailRef = thumbImgInfo.imageRef

          // Get a key for a new Post.
          var newKey = db.ref().child('Products').push().key
          product.id = newKey
          
        } else if (mode == 1) {
          // edit existed product
          let imageChanged = $("input#bigImg").get(0).files.length !== 0
          console.log('imageChanged', imageChanged)
          let thumbnailChanged = $("input#thumbImg").get(0).files.length !== 0
          console.log('thumbnailChanged', thumbnailChanged) 

          if (imageChanged) {
            let bigImg = $("input#bigImg").get(0).files[0]
            let bigImgInfo = await this.uploadImages(bigImg, "#progress-big-img")
            this.deleteImage(this.selectedRow.imageRef)
            product.image = bigImgInfo.imageURL          
            product.imageRef = bigImgInfo.imageRef
          } else {
            product.image = this.selectedRow.image          
            product.imageRef = this.selectedRow.imageRef
          }

          if (thumbnailChanged) {   
            let thumbImg = $("input#thumbImg").get(0).files[0]
            let thumbImgInfo = await this.uploadImages(thumbImg, "#progress-thumb-img")
            this.deleteImage(this.selectedRow.thumbnailRef)
            product.thumbnail = thumbImgInfo.imageURL
            product.thumbnailRef = thumbImgInfo.imageRef
          } else {
            product.thumbnail = this.selectedRow.thumbnail
            product.thumbnailRef = this.selectedRow.thumbnailRef
          }

          product.id = this.selectedRow.id          
        }

        db.ref().child(`Products/${product.id}`)
          .update(product)
          .then(() => {       
            let message = mode == 0 ? `Thêm ${product.name} thành công!` : `Sửa ${product.name} thành công!`    
            this.$store.dispatch(
              'alert',
              {type: 'success', title: 'Thao thác thành công', message: message}
            )              
            setTimeout(() => {
              $('#detail-overlay').hide() 
            }, 500) 

            $("input#bigImg").val("");
            $("input#thumbImg").val("");
          })  

        // add or update product
        this.addMode = false;
      }
    },
    deleteProduct() {   
      $('#detail-overlay').show()    
      this.deleteImage(this.selectedRow.imageRef)
      this.deleteImage(this.selectedRow.thumbnailRef)
      let name = this.selectedRow.name

      db.ref().child(`Products/${this.selectedRowID}`)
        .remove()
        .then(() => {      
          this.$store.dispatch(
            'alert',
            {type: 'success', title: 'Thao thác thành công', message: `Xoá ${name} thành công!`}
          )              
          setTimeout(() => {
            $('#detail-overlay').hide() 
          }, 500) 

          $("input#bigImg").val("");
          $("input#thumbImg").val("");
      }) 

        // add or update product
      this.addMode = false;
      this.clearInput();        
      this.productError = null;
      this.selectedRowID = null;


    },
    clearInput() {
      $('input[name="name"]').val("");
      $('input[name="amount"]').val("");
      $('input[name="unit-price"]').val("");
      $('input[name="sale-price"]').val("");
      $("#product-desc").val("")
      $("input#bigImg").val("");
      $("input#thumbImg").val("");
      $("#big-img-name").text("Hình cỡ lớn");
      $("#thumb-img-name").text("Hình cỡ nhỏ");
      $("#product--thumb_img").attr("src", "imgs/no_image--imgs.png");
      $("#product--big_img").attr("src", "imgs/no_image--imgs.png");
      $("input#on-sale").attr("checked", "checked");
      $("input#on-sale")
        .closest(".icheckbox_minimal-red")
        .attr("class", "icheckbox_minimal-red checked");
    },
    cancelAddProduct() {
      this.addMode = false;
      this.clearInput();
      this.productError = null;
    },
    showSelectedProduct() {
      $('#detail-overlay').show()
      let product = this.selectedRow

      $('input[name="name"]').val(product.name);
      $('input[name="amount"]').val(product.amount);
      $('input[name="unit-price"]').val(product.unitPrice);
      $('input[name="sale-price"]').val(product.salePrice);      
      $("#product-desc").val(product.describe)
      $("#product--thumb_img").attr("src", product.thumbnail);
      $("#product--big_img").attr("src", product.image);
      if (product.onSale) {
        $("input#on-sale").attr("checked", "checked");

        $("input#on-sale")
          .closest(".icheckbox_minimal-red")
          .attr("class", "icheckbox_minimal-red checked"); 
      } else {
        $("input#on-sale").prop('checked', false);
        $("input#on-sale")
          .closest(".icheckbox_minimal-red")
          .attr("class", "icheckbox_minimal-red"); 
      }   
      setTimeout(() => {
        $('#detail-overlay').hide() 
      }, 500)       
    },
    uploadImages(imgFile, progressDivContent) {
      // iamge File or Blob
      var file = imgFile;

      // Create the file metadata
      var metadata = {
        contentType: "image"
      };

      
      let imageRef = "ProductImages/" + file.name
      

      // Upload file and metadata to the object 'images/mountains.jpg'
      var uploadTask = storage
        .ref()
        .child(imageRef)
        .put(file, metadata);

      return new Promise((resolve, reject) => {
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              snapshot.bytesTransferred / snapshot.totalBytes * 100;

            $(progressDivContent + " div.progress-bar").css({
              width: `${progress}%`
            });
          },
          function(error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            reject(error.code)
          },
          function() {
            // Upload completed successfully, now we can get the download URL
            var downloadURL = uploadTask.snapshot.downloadURL;
            resolve({imageURL: downloadURL, imageRef: imageRef})
          }
        );
      });
    },
    deleteImage(childRef) {         
      var deleteRef = storage.ref().child(childRef)
      deleteRef.getDownloadURL()
        .then(() => {
          deleteRef.delete().then(function() {
            // File deleted successfully
          }).catch(function(error) {
            console.log(error)
          })
        })
        .catch(() => {
          console.log('File not exist!')

        })
      
    },
    testAlert() {
      let i = Math.round(Math.random()*3)
      let types = ['success', 'warning', 'info', 'danger']
      this.$store.dispatch('alert', {type: types[i], title: 'OK', message: 'thanh cong'})
    }
  }
};
</script>

<style lang="scss" scoped>
#table-overlay,
#detail-overlay {
  display: none;
}
#product--big_img,
#product--thumb_img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.img-show {
  max-width: 100%;
  height: 150px;
}
.form-group {
  margin: 0;
}
textarea.form-control {
  width: 100% !important;
  height: 80px !important;
}
.m-top-10 {
  margin-top: 10px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}
input[type="number"] {
  text-align: right;
}
label.btn {
  text-align: left;
}
.img-picker-helper {
  font-size: 12px;
}
.progress {
  margin-bottom: 5px;
}
</style>
