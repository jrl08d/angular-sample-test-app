angular.module('Eggly', [
  'ui.router',
  'categories',
  'categories.bookmarks'
])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('eggly', {
        url:'',
        abstract: true
      })
    ;

    $urlRouterProvider.otherwise('/');
  })
  .controller('MainCtrl', function ($scope,$state) {


      $scope.isCreating = false;
      $scope.isEditing = false;
      $scope.currentCategory = null;

      function isCurrentCategory(category) {
          return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
      }

      function setCurrentCategory(category) {
          $scope.currentCategory = category;

          // $state.go('eggly.categories.bookmarks', {category:category.name})

          cancelCreating();
          cancelEditing();
      }

      $scope.isCurrentCategory = isCurrentCategory;
      $scope.setCurrentCategory = setCurrentCategory;

      //-------------------------------------------------------------------------------------------------
      // CRUD
      //-------------------------------------------------------------------------------------------------

      function resetCreateForm() {
        $scope.newBookmark = {
          title: '',
          url: '',
          category: $scope.currentCategory.name
        }
      }

      function createBookmark(bookmark) {
        bookmark.id = $scope.bookmarks.length;
        $scope.bookmarks.push(bookmark);

        resetCreateForm();
      }

      $scope.createBookmark = createBookmark;

      $scope.editedBookmark = null;

      function setEditedBookmark(bookmark) {
        $scope.editedBookmark = angular.copy(bookmark);
      }

      function updateBookmark(bookmark) {
        var index = _.findIndex($scope.bookmarks, function(b){
          return b.id == bookmark.id;
        });
        $scope.bookmarks[index] = bookmark;

        $scope.editedBookmark = null;
        $scope.isEditing = false;
      }

      function isSelectedBookmark(bookmarkId) {
        return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
      }

      $scope.setEditedBookmark = setEditedBookmark;
      $scope.updateBookmark = updateBookmark;
      $scope.isSelectedBookmark = isSelectedBookmark;

      function deleteBookmark(bookmark) {
        _.remove($scope.bookmarks, function(b){
          return b.id == bookmark.id
        });
      }

      $scope.deleteBookmark = deleteBookmark;

      //-------------------------------------------------------------------------------------------------
      // CREATING AND EDITING STATES
      //-------------------------------------------------------------------------------------------------
      function shouldShowCreating() {
          return $scope.currentCategory && !$scope.isEditing;
      }

      function startCreating() {
          $scope.isCreating = true;
          $scope.isEditing = false;

          resetCreateForm();
      }

      function cancelCreating() {
          $scope.isCreating = false;
      }

      $scope.shouldShowCreating = shouldShowCreating;
      $scope.startCreating = startCreating;
      $scope.cancelCreating = cancelCreating;

      function shouldShowEditing() {
          return $scope.isEditing && !$scope.isCreating;
      }

      function startEditing() {
          $scope.isCreating = false;
          $scope.isEditing = true;
      }

      function cancelEditing() {
          $scope.isEditing = false;
          $scope.editedBookmark = null;
      }

      $scope.startEditing = startEditing;
      $scope.cancelEditing = cancelEditing;
      $scope.shouldShowEditing = shouldShowEditing;
  })
;