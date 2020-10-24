using System;
using System.Security.Cryptography;
using System.Text;

namespace Model
{
    class Crypto
    {
        public static string Encrypto(string msg)
        {
            SHA512 sha512 = new SHA512CryptoServiceProvider();
            string resultSha512 = Convert.ToBase64String(sha512.ComputeHash(Encoding.Default.GetBytes(msg)));
            return resultSha512;
        }
    }
}