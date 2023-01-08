export function wpUpdateUserAvatar(avatar: { url: string }) {
  return {
    ...avatar,
    url: avatar.url?.replace("http://", "https://"),
  }
}
