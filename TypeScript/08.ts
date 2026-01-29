type Profile = {
  username: string;
  bio: string | null;
  avatarUrl?: string;
};

const profile1: Profile = {
  username: "Alice",
  bio: null,
};

const profile2: Profile = {
  username: "Bob",
  bio: "I'm a TypeScript Programmer.",
  avatarUrl: "./image.jpg",
};

function showProfile(profile: Profile) {
  const bio = profile.bio === null ? "User doesn't have a bio" : profile.bio;
  const avatarUrl = profile.avatarUrl ? profile.avatarUrl : "./defaultImage";
  console.log(`
    Username: ${profile.username}
    Bio: ${bio}
    Avatar: ${avatarUrl}
    `);
}

showProfile(profile1);
showProfile(profile2);
