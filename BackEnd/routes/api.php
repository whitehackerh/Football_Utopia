<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CreateUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GetUserBasicProfileWithNameController;
use App\Http\Controllers\SetUserBasicProfileController;
use App\Http\Controllers\GetProfilePictureCroppedController;
use App\Http\Controllers\SetProfilePictureController;
use App\Http\Controllers\DeleteProfilePictureController;
use App\Http\Controllers\GetProfilePictureOriginalController;
use App\Http\Controllers\GetMasterDataForProfileController;
use App\Http\Controllers\GetUserDetailProfileController;
use App\Http\Controllers\SetUserDetailProfileController;
use App\Http\Controllers\GetFilterSettingsController;
use App\Http\Controllers\SetFilterSettingsController;
use App\Http\Controllers\GetUserListForMatchController;
use App\Http\Controllers\GetUserProfileForMatchController;
use App\Http\Controllers\SetMatchActionController;
use App\Http\Controllers\GetMatchHistoryController;
use App\Http\Controllers\GetUserProfileForCommonCardController;
use App\Http\Controllers\SendLikeController;
use App\Http\Controllers\GetUnreadNotificationsController;
use App\Http\Controllers\GetNotificationsController;
use App\Http\Controllers\SetReadNotificationsController;
use App\Http\Controllers\GetUnreadMessagesController;
use App\Http\Controllers\GetLatestMessageListController;
use App\Http\Controllers\GetMessagesController;
use App\Http\Controllers\SetReadMessagesController;
use App\Http\Controllers\DeleteMessageController;
use App\Http\Controllers\SendMessageController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::group(['middleware' => 'api'], function ($router) {
//     Route::post('login', 'AuthController@login');
//     Route::post('logout', 'AuthController@logout');
//     Route::post('refresh', 'AuthController@refresh');
//     Route::post('me', 'AuthController@me');
// });
Route::get('/getMasterDataForProfile', GetMasterDataForProfileController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/getUserBasicProfile', [AuthController::class, 'getUserBasicProfile']);
    Route::post('/getUserBasicProfileWithName', getUserBasicProfileWithNameController::class);
    Route::post('/setUserBasicProfile', SetUserBasicProfileController::class);
    Route::post('/getProfilePictureCropped', GetProfilePictureCroppedController::class);
    Route::post('/setProfilePicture', SetProfilePictureController::class);
    Route::post('/deleteProfilePicture', DeleteProfilePictureController::class);
    Route::post('/getProfilePictureOriginal', GetProfilePictureOriginalController::class);
    Route::post('/getUserDetailProfile', GetUserDetailProfileController::class);
    Route::post('/setUserDetailProfile', SetUserDetailProfileController::class);
    Route::post('/getFilterSettings', GetFilterSettingsController::class);
    Route::post('/setFilterSettings', SetFilterSettingsController::class);
    Route::post('/getUserListForMatch', GetUserListForMatchController::class);
    Route::post('/getUserProfileForMatch', GetUserProfileForMatchController::class);
    Route::post('/setMatchAction', SetMatchActionController::class);
    Route::post('/getMatchHistory', GetMatchHistoryController::class);
    Route::post('/getUserProfileForCommonCard', GetUserProfileForCommonCardController::class);
    Route::post('/sendLike', SendLikeController::class);
    Route::post('/getUnreadNotifications', GetUnreadNotificationsController::class);
    Route::post('/getNotifications', GetNotificationsController::class);
    Route::post('/setReadNotifications', SetReadNotificationsController::class);
    Route::post('/getUnreadMessages', GetUnreadMessagesController::class);
    Route::post('/getLatestMessageList', GetLatestMessageListController::class);
    Route::post('/getMessages', GetMessagesController::class);
    Route::post('/setReadMessages', SetReadMessagesController::class);
    Route::post('/deleteMessage', DeleteMessageController::class);
    Route::post('/sendMessage', SendMessageController::class);
});

Route::middleware(['WBE'])->group(function() {
    Route::get('/createUser', CreateUserController::class);
});

