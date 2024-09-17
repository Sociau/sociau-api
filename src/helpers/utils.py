import hashlib
import os
from cryptography.fernet import Fernet

class CryptographyManager:
    def __init__(self, key=None):
        if key is None:
            key = os.getenv('CRYPTO_KEY')
            if key is None:
                raise ValueError("CRYPTO_KEY environment variable not set")
            key = key.encode('utf-8')
        try:
            self.cipher_suite = Fernet(key)
        except ValueError as e:
            raise ValueError(f"Invalid Fernet key: {e}")

    def from_string_to_hash_code(self, text):
        return self.cipher_suite.encrypt(text.encode('utf-8'))

    def from_hash_code_to_string(self, cipher_text):
        if isinstance(cipher_text, str):
            cipher_text = cipher_text.encode('utf-8')
        try:
            return self.cipher_suite.decrypt(cipher_text).decode('utf-8')
        except (ValueError, TypeError) as e:
            raise ValueError(f"Decryption failed: {e}")