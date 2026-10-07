import {
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';

import { auth } from '@/infrastructure/firebase/firebaseConfig';
import { User } from '@/domain/entities/User';

export class FirebaseAuthRepository {
  async login(email: string, password: string): Promise<User> {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return this.mapUser(result.user);
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  private mapUser(firebaseUser: FirebaseUser): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
    };
  }
}