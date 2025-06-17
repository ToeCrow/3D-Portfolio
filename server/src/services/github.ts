import axios from 'axios';
import { GitHubRepo } from '../types/github';

const username = 'ToeCrow';

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await axios.get<GitHubRepo[]>(`https://api.github.com/users/${username}/repos`);
  return res.data.filter((repo) =>
    ['examen', 'health', 'travel', 'vice'].some(key =>
      repo.name.toLowerCase().includes(key)
    )
  );
}
