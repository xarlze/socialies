class FriendshipsController < ApplicationController

  # GET /friendships/1
  def show
    @my_requests = Friendship.where(:user_id=>params[:id])
    # @my_requests = Friendship.find_by_user_id(params[:id])
    @request_mes = Friendship.where(:friend_user_id=>params[:id])
    render json: { friends: @my_requests+@request_mes}
  end

  # POST /friendships
  def create
    @friendship = Friendship.new(friendship_params)

    if @friendship.save
      render json: @friendship, status: :created
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /friendships/1
  def update
    @friendship = Friendship.find_by(user_id:param[:friendship][:user_id], friend_user_id:param[:friendship][:friend_user_id])
    
    if @friendship.update(friendship_params)
      render json: @friendship
    else
      render json: @friendship.errors, status: :unprocessable_entity
    end
  end

  # DELETE /friendships/1
  def destroy
    @friendship = Friendship.find_by_room_id(params[:id])
    @user1 = User.find(@friendship.user_id)
    @user2 = User.find(@friendship.friend_user_id)
    @user1.friendships.delete(@user2)
  end

  private
    # Only allow a trusted parameter "white list" through.
    def friendship_params
      params.require(:friendship).permit(:user_id, :friend_user_id, :room_id)
    end
end
