<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Elliptic\EC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use kornrunner\Keccak;

class SIWEController extends Controller
{
    protected function checkSignature($message, $signature, $address): bool
    {
        $msglen = strlen($message);
        $hash   = Keccak::hash("\x19Ethereum Signed Message:\n{$msglen}{$message}", 256);
        $sign   = ["r" => substr($signature, 2, 64),
                   "s" => substr($signature, 66, 64)];
        $recid  = ord(hex2bin(substr($signature, 130, 2))) - 27;
        if ($recid != ($recid & 1))
            return false;

        $ec = new EC('secp256k1');
        $pubkey = $ec->recoverPubKey($hash, $sign, $recid);
        $derived_address = "0x" . substr(Keccak::hash(substr(hex2bin($pubkey->encode("hex")), 1), 256), 24);

        return strtolower($address) == strtolower($derived_address);
    }

    protected function extractDataFromMessage($message)
    {
        // Define regex patterns to extract Ethereum address and nonce
        $ethereumAddressPattern = '/0x[a-fA-F0-9]{40}/';
        $noncePattern = '/Nonce:\s*(\S+)/';

        // Match Ethereum address
        preg_match($ethereumAddressPattern, $message, $ethereumAddressMatches);
        $ethereumAddress = $ethereumAddressMatches[0] ?? null;

        // Match nonce
        preg_match($noncePattern, $message, $nonceMatches);
        $nonce = $nonceMatches[1] ?? null;

        // Return extracted Ethereum address and nonce
        return [
            'ethereum_address' => $ethereumAddress,
            'nonce' => $nonce
        ];
    }
    public function getNonce(Request $request)
    {
        $token = $request->session()->token();

        return response()->json([
            'nonce' => $token
        ]);
    }

    public function getSession(Request $request)
    {
        if (Auth::check()) {
            // Get the logged-in user
            $user = Auth::user();

            // Return the user's Ethereum address
            return response()->json([
                'isValid' => true,
                'address' => $user->eth_address,
                'chainId' => 1
            ]);
        } else {
            // User is not logged in
            return response()->json([
                'isValid' => false,
                'address' => '',
                'chainId' => 0
            ]);
        }
    }

    public function verifySignature(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'signature' => 'required|string',
        ]);
        $nonceFromSession = $request->session()->token();

        // Extract Ethereum address and nonce from the message
        $messageData = $this->extractDataFromMessage($request->input('message'));
        $ethereumAddress = $messageData['ethereum_address'];
        $nonceFromMessage = $messageData['nonce'];

        // Validate that the nonce from the message matches the one from the session token
        if ($nonceFromSession !== $nonceFromMessage) {
            return response()->json(['isValid' => false, 'error' => 'Nonce mismatch']);
        }

        // Perform the signature validation
        if(!$signatureIsValid = $this->checkSignature($request->input('message'), $request->input('signature'), $ethereumAddress)) return response()->json(['isValid' => $signatureIsValid]);;


        $user = User::query()->where('eth_address', $ethereumAddress)->first();
        if (!$user) {
            // If the user does not exist, create a new account
            $user = new User();
            $user->name = $ethereumAddress;
            $user->eth_address = $ethereumAddress;
            // You may want to set other user properties here
            $user->save();
        }

        Auth::login($user);

        return response()->json(['isValid' => $signatureIsValid, 'user' => $user->name]);
    }

    public function signOut(Request $request)
    {
        Auth::guard('web')->logout();
        //$request->session()->invalidate();
        //$request->session()->regenerateToken();
        return response()->json(['isSignOut' => true]);
    }
}
